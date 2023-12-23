"use client";

type SearchComponentProps = {
  label: string;
  onFocus: () => void;
  onChange: (value: string) => void;
  value?: string;
};

import { FormEvent } from "react";

export default function SearchComponent(props: SearchComponentProps) {
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.value);
  };

  return (
    <div className="space-x-5">
      <label htmlFor={props.label}>{props.label}</label>
      <input
        id={props.label}
        className="dark:text-white p-2 border bg-slate-600 border-slate-500 focus:border-red-600"
        onFocus={props.onFocus}
        onChange={handleChange}
        value={props.value}
      />
    </div>
  );
}
