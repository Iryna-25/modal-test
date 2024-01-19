import React, { useState } from "react";

import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      page: "",
      description: "",
      lesson: "lesson1",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.page && formState.description && formState.lesson) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
            <div className="form-group">
            <h2>Створюй та редагуй блоки</h2>
          </div>
          <div className="form-group">
            <label htmlFor="page">Назва уроку</label>
            <input name="page" onChange={handleChange} value={formState.page} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Опис</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lesson">Урок</label>
            <select
              name="lesson"
              onChange={handleChange}
              value={formState.lesson}
            >
              <option value="lesson1">Урок 1</option>
              <option value="lesson2">Урок 2</option>
              <option value="lesson3">Урок 3</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};