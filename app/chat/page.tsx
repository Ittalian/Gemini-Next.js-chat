"use client";

import React, {useState} from "react";
import {run} from '@/app/api/gemini';

const Chat: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [flag, setFlag] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setFlag(true);
      if (prompt == "") {
        setResponse("文字を入力してください")
      } else {
      const response = await run(
        prompt
      );
      const t = response ?? "";
      setResponse(t.toString());
      }
    } catch (error) {
      setResponse("エラーが発生しました");
    }
    setFlag(false);
  };

  return (
    <div>
        <div className="mt-3 p-3">
          <form onSubmit={handleSubmit}>
            <div className="space-y-3 bg-white px-4 py-5 sm:p-6">
              <label htmlFor="Prompt" className="block text-sm font-medium">
                質問文
              </label>
              <div>
                    <textarea
                      rows={8}
                      className="mt-1 px-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      placeholder="ここに質問を入れてください"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
              </div>
              <div>
                {
                (() => {
                  if (!flag) {
                  return <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700"
                  >
                    質問する
                  </button>
                } else {
                  return <p>Loading...</p>
                }})()
              }
              </div>
            </div>
          </form>
        </div>
        <div className="mt-3 p-3 md:col-span-2 md:mt-0">
          <div className="bg-white px-4 py-5 sm:p-6">
            <h2 className="text-base font-semibold leading-6 text-gray-900">質問の答え</h2>
            <p className="mt-1 text-sm text-gray-600">{response}</p>
          </div>
        </div>
    </div>
  );
};

export default Chat;
