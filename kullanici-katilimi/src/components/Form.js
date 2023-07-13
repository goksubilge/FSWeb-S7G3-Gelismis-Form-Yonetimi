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
    // dynamic object key name.
    let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const newFormData = {
      ...formData,
      [e.target.name]: value,
    };
    setFormData(newFormData);
  };
  // type'sı checkbox ise eğer direkt olarak e.target.value yu okumaz. o yüzden value tanımladım. type checkbox ise value yu e.target.checked e eşitle dedim. öyle düzeldi checkbox inputum.
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
          name="email"
          value={formData.email}
        />
      </div>
      <div>
        <label htmlFor="pass">Key Pls</label>
        <input
          onChange={chanceHandler}
          type="password"
          name="pass"
          value={formData.pass}
        />
      </div>
      <div>
        <label htmlFor="terms">Kullanım Şartları</label>
        <input
          onChange={chanceHandler}
          type="checkbox"
          name="terms"
          checked={formData.terms}
        />
      </div>
    </form>
  );
};
export default Form;
