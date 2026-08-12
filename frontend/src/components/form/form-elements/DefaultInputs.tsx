import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
}

interface FormProps {
  title: string;
  fields: Field[];
  initialValue?: {};
  onSubmit: (data: any) => void | Promise<void>;
  submitText?: string;
}

export interface FormConfig {
  config: FormProps;
}

export default function DynamicForm({ config }: FormConfig) {
  const [formData, setFormData] = useState<Record<string, any>>(
    config.initialValue || {},
  );

  useEffect(() => {
    if (config.initialValue) {
      setFormData(config.initialValue);
    }
  }, [config.initialValue]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    config.onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={formData[field.name] ?? ""}
                  className="w-full rounded-md border px-3 py-2"
                  onChange={handleChange}
                />
              </div>
            );

          case "date":
            return (
              <div key={field.name}>
                <label>{field.label}</label>
                <div>
                  <DatePicker
                    selected={
                      formData[field.name]
                        ? new Date(formData[field.name])
                        : null
                    }
                    onChange={(date: Date | null) =>
                      setFormData({
                        ...formData,
                        [field.name]: date
                          ? date.toISOString().split("T")[0]
                          : "",
                      })
                    }
                    placeholderText="Select date"
                    dateFormat="yyyy-MM-dd"
                    className="w-full rounded-md border px-3 py-2"
                  />
                </div>
              </div>
            );
          case "number":
            return (
              <div key={field.name}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  {field.name}
                </label>

                <input
                  type="number"
                  name={field.name}
                  placeholder={field.label}
                  value={formData[field.name] ?? ""}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  onChange={handleChange}
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
                  value={formData[field.name] ?? ""}
                  className="w-full rounded-md border px-3 py-2"
                  onChange={handleChange}
                />
              </div>
            );

          case "textarea":
            return (
              <div key={field.name}>
                <label>{field.label}</label>
                <textarea
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  className="w-full rounded-md border px-3 py-2"
                  onChange={handleChange}
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
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
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
