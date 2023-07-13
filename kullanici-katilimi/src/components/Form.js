import React, { useState } from "react";
import * as Yup from "yup";
// as Yup dediğim için Yup.object oldu. as demeseydim başına bir şey atamıyordum.

let userKurallar = Yup.object({
  name: Yup.string()
    .required("isimsiz insan olmaz yalnız")
    .length(4, "ismin en az 4 karakter olsun"),

  email: Yup.string()
    .required("bana e posta adresin lazım")
    .email("düzgün gir şunu yanlış yazıyosun"),

  pass: Yup.string()
    .required("şifresiz olmaz, bize kilit lazım")
    .min(6, "bu kısa şifreyi hatırlarsın, bana unutacağın şifreler koy!")
    .matches(
      /[^0-9]/,
      "bakıyorum da şifren hep sayı, yeterince karışık bulmadım. harf de koy!"
    ),
  terms: Yup.boolean().oneOf(
    [true],
    "zorunlu değilse bile gönüllü kabul etmelisin"
  ),
});
// oneOf dediği şey çokluseçimden birini seçmesi
// https://github.com/jquense/yup/blob/pre-v1/README.md dekine benzer yaklaşım uyguladım.
// boolen da required geçersiz oluyor, uyarını true nun yanına yazıcaksın çünkü true değilse zaten false.

const Form = () => {
  const ilkFormData = {
    name: "bilge",
    email: "@mail",
    pass: "goksu",
    terms: true,
  };
  const [formData, setFormData] = useState(ilkFormData);
  // şimdi yazıkça güncellenmesi için chanceHandler ekliyorum. inputlarda oluyor tabiki.

  const changeHandler = (e) => {
    //console.log("change handler kontrolü", e.target.name);
    // console.log ("event", e);
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
    Yup.reach(userKurallar, e.target.name)
      .validate(value)
      .then((valid) => {
        console.log("valid", valid);
      })
      .catch((err) => {
        console.log("error", err);
      });

    setFormData(newFormData);
  };
  // type'sı checkbox ise eğer direkt olarak e.target.value yu okumaz. o yüzden value tanımladım. type checkbox ise value yu e.target.checked e eşitle dedim. öyle düzeldi checkbox inputum.
  return (
    <form /*onSubmit={submitHandler}*/>
      <div>
        <label htmlFor="name">Name-Surname</label>
        <input
          onChange={changeHandler}
          type="text"
          name="name"
          value={formData.name}
        />
      </div>
      <div>
        <label htmlFor="email">E-Mail</label>
        <input
          onChange={changeHandler}
          type="email"
          name="email"
          value={formData.email}
        />
      </div>
      <div>
        <label htmlFor="pass">Key Pls</label>
        <input
          onChange={changeHandler}
          type="password"
          name="pass"
          value={formData.pass}
        />
      </div>
      <div>
        <label htmlFor="terms">Kullanım Şartları</label>
        <input
          onChange={changeHandler}
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
