package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"time"
)

const (
	model  = "llama3.2:1b"
	stream = false
	system = "You will be given data representing a resume and corresponding job description. You will read the job description, find key things that the job is looking for and then read the resume. Attempt to find a maximum of 3 things that the user should add to make their resume match the job description better. Only reply with a header saying these are the suggestions and also, underneath the header should be the bulleted suggestions, no special characters or formatting. Example: if a job description mentions a specific task or tool we should recommend to the user that they add that."
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
		body, _ := io.ReadAll(r.Body)

		llmReq, _ := json.Marshal(NewRequest(string(body)))
		fmt.Println(string(llmReq))

		req, _ := http.NewRequest("POST", "http://llama:11434/api/generate", bytes.NewBuffer(llmReq))
		req.Header.Set("Content-Type", "application/json")

		now := time.Now()
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			slog.Error(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()
		elapsed := time.Since(now)

		respBody, _ := io.ReadAll(resp.Body)

		llmResp := LLMResponse{}

		err = json.Unmarshal(respBody, &llmResp)
		if err != nil {
			slog.Error(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		llmResp.Response = fmt.Sprintf("Generated in %s\n\n%s", elapsed, llmResp.Response)

		w.WriteHeader(resp.StatusCode)
		w.Write([]byte(llmResp.Response))
	})

	http.ListenAndServe(":8000", mux)
}
