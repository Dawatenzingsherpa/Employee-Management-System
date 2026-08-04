import React from "react";

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
}

interface FormProps {
  title: string;
  fields: Field[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitText?: string;
}

interface FormConfig {
  config: FormProps;
}

export default function DynamicForm({ config }: FormConfig) {
  return (
    <form onSubmit={config.onSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold">{config.title}</h2>

      {config.fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <div key={field.name}>
                <label>{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            );

          case "email":
            return (
              <div key={field.name}>
                <label>{field.label}</label>
                <input
                  type="email"
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            );

          case "textarea":
            return (
              <div key={field.name}>
                <label>{field.label}</label>
                <textarea
                  name={field.name}
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            );

          case "select":
            return (
              <div key={field.name}>
                <label>{field.label}</label>
                <select
                  name={field.name}
                  className="w-full rounded-md border px-3 py-2"
                >
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            );

          default:
            return null;
        }
      })}

      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-white"
      >
        {config.submitText}
      </button>
    </form>
  );
}
