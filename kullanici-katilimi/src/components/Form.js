import React, { useState } from "react";

const Form = () => {
  const ilkFormData = {
    name: "bilge",
    email: "mail",
    pass: "goksu",
    terms: true,
  };
  const [formData, setFormData] = useState(ilkFormData);
  // şimdi yazıkça güncellenmesi için chanceHandler ekliyorum. inputlarda oluyor tabiki.

  const chanceHandler = (e) => {
    console.log("change handler kontrolü", e.target.name);
  };
  return (
    <form>
      <div>
        <label htmlFor="name">Name-Surname</label>
        <input
          onChange={chanceHandler}
          type="text"
          name="name"
          value={formData.name}
        />
      </div>
      <div>
        <label htmlFor="email">E-Mail</label>
        <input
          onChange={chanceHandler}
          type="email"
          name="name"
          value={formData.email}
        />
      </div>
      <div>
        <label htmlFor="terms">Key Pls</label>
        <input
          onChange={chanceHandler}
          type="password"
          name="name"
          value={formData.pass}
        />
      </div>
      <div>
        <label htmlFor="terms">Kullanım Şartları</label>
        <input
          onChange={chanceHandler}
          type="checkbox"
          name="name"
          checked={formData.terms}
        />
      </div>
    </form>
  );
};
export default Form;
