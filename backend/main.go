package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
)

const (
	model  = "resume"
	stream = true
	system = "You will be given data representing a resume and corresponding job description. The job description might not be tech related so don't say every job needs programming. You will read the job description, find key things that the job is looking for and then read the resume. Attempt to find a maximum of 3 things that the user should add to make their resume match the job description better. Only reply with a header saying these are the suggestions and the bulleted suggestions, no special characters or formatting. If they're already a pefect match, say so."
)

type LLMRequest struct {
	Model  string `json:"model"`
	Prompt string `json:"prompt"`
	Stream bool   `json:"stream"`
	System string `json:"system"`
}

type LLMResponse struct {
	Model              string `json:"model"`
	CreatedAt          string `json:"created_at"`
	Response           string `json:"response"`
	Done               bool   `json:"done"`
	DoneReason         string `json:"done_reason"`
	Context            []int  `json:"context"`
	TotalDuration      int64  `json:"total_duration"`
	LoadDuration       int64  `json:"load_duration"`
	PromptEvalCount    int    `json:"prompt_eval_count"`
	PromptEvalDuration int64  `json:"prompt_eval_duration"`
	EvalCount          int    `json:"eval_count"`
	EvalDuration       int64  `json:"eval_duration"`
}

func NewRequest(prompt string) LLMRequest {
	return LLMRequest{
		Model:  model,
		Prompt: prompt,
		Stream: stream,
		System: system,
	}
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("POST /api/llama", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")

		flusher, ok := w.(http.Flusher)
		if !ok {
			slog.Error("Streaming not supported")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		body, err := io.ReadAll(r.Body)
		if err != nil {
			slog.Error("Failed to read request body", "error", err)
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		llmReq, err := json.Marshal(NewRequest(string(body)))
		if err != nil {
			slog.Error("Failed to marshal LLM request", "error", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		req, err := http.NewRequest("POST", "http://llama:11434/api/generate", bytes.NewBuffer(llmReq))
		if err != nil {
			slog.Error("Failed to create request", "error", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		req.Header.Set("Content-Type", "application/json")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			slog.Error("Failed to make request", "error", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		reader := bufio.NewReader(resp.Body)

		for {
			line, err := reader.ReadBytes('\n')
			if err != nil {
				if err == io.EOF {
					break
				}
				slog.Error("Failed to read response", "error", err)
				return
			}

			var llmResp LLMResponse
			if err := json.Unmarshal(line, &llmResp); err != nil {
				slog.Error("Failed to unmarshal response", "error", err)
				continue
			}

			fmt.Fprintf(w, "data: %s\n\n", llmResp.Response)
			flusher.Flush()

		}
	})

	http.ListenAndServe(":8000", mux)
}
