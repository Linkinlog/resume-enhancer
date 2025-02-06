package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
)

const (
	model  = "llama3.2:1b-instruct-q3_K_S"
	stream = false
	system = "You are a professional resume writer. You will be given a resume and a job description and help users better align their resume with the job description."
)

type LLMRequest struct {
	Model  string `json:"model"`
	Prompt string `json:"prompt"`
	Stream bool   `json:"stream"`
	System string `json:"system"`
}

type LLMResponse struct {
    Model              string   `json:"model"`
    CreatedAt          string   `json:"created_at"`
    Response           string   `json:"response"`
    Done              bool     `json:"done"`
    DoneReason        string   `json:"done_reason"`
    Context           []int    `json:"context"`
    TotalDuration     int64    `json:"total_duration"`
    LoadDuration      int64    `json:"load_duration"`
    PromptEvalCount   int      `json:"prompt_eval_count"`
    PromptEvalDuration int64   `json:"prompt_eval_duration"`
    EvalCount         int      `json:"eval_count"`
    EvalDuration      int64    `json:"eval_duration"`
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
	fmt.Println("IM ALIVE")
	mux := http.NewServeMux()

	mux.HandleFunc("POST /api/llama", func(w http.ResponseWriter, r *http.Request) {
		body, _ := io.ReadAll(r.Body)

		llmReq, _ := json.Marshal(NewRequest(string(body)))
		fmt.Println(string(llmReq))

		req, _ := http.NewRequest("POST", "http://llama:11434/api/generate", bytes.NewBuffer(llmReq))
		req.Header.Set("Content-Type", "application/json")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			slog.Error(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		respBody, _ := io.ReadAll(resp.Body)

		llmResp := LLMResponse{}

		err = json.Unmarshal(respBody, &llmResp)
		if err != nil {
			slog.Error(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		w.WriteHeader(resp.StatusCode)
		w.Write([]byte(llmResp.Response))
	})

	http.ListenAndServe(":8000", mux)
}
