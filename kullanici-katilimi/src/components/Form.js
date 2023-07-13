import React, { useState } from "react";
import * as Yup from "yup";
// as Yup dediğim için Yup.object oldu. as demeseydim başına bir şey atamıyordum.

let userKurallar = Yup.object({
  name: Yup.string().required(),

  email: Yup.string().email(),

  pass: Yup.string()
    .required()
    .min(6)
    .matches(/[^0-9]/),
  terms: Yup.boolean().required().oneOf([true]),
});
// oneOf dediği şey çokluseçimden birini seçmesi
// https://github.com/jquense/yup/blob/pre-v1/README.md dekine benzer yaklaşım uyguladım.

const Form = () => {
  const ilkFormData = {
    name: "bilge",
    email: "@mail",
    pass: "goksu",
    terms: true,
  };
  const [formData, setFormData] = useState(ilkFormData);
  // şimdi yazıkça güncellenmesi için chanceHandler ekliyorum. inputlarda oluyor tabiki.

  const chanceHandler = (e) => {
    console.log("change handler kontrolü", e.target.name);
    // dynamic object key name.
    // açıklamalı if yazımı:
    /* let value = e.target.value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } */
    // single line if yazım:
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const newFormData = {
      ...formData,
      [e.target.name]: value,
    };
    setFormData(newFormData);
  };
  // type'sı checkbox ise eğer direkt olarak e.target.value yu okumaz. o yüzden value tanımladım. type checkbox ise value yu e.target.checked e eşitle dedim. öyle düzeldi checkbox inputum.
  return (
    <form onSubmit={submitHandler}>
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
      <button type="submit">SEND</button>
    </form>
  );
};
export default Form;
