import React, { useEffect, useState } from "react";
import * as Yup from "yup";
// as Yup dediğim için Yup.object oldu. as demeseydim başına bir şey atamıyordum.
import axios from "axios";

let userKurallar = Yup.object({
  name: Yup.string()
    .required("isimsiz insan olmaz yalnız")
    .min(4, "ismin en az 4 karakter olsun"),

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
    name: "",
    email: "",
    pass: "",
    terms: true,
  };
  const [formData, setFormData] = useState(ilkFormData);
  // şimdi yazıkça güncellenmesi için chanceHandler ekliyorum. inputlarda oluyor tabiki.

  //bir tane hataları tutan state, bir tane d eform hatası tutan 2 state tanımlıyorum.

  const [errors, setErrors] = useState({});
  const [isDisable, setisDisable] = useState(true);
  const [sonuc, setSonuc] = useState([]);

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
        //buraya da checkbox geçerliliği iin bunu ekledim. eğer box doluysa form gidebilecek. bütün hatalarımdan bir hata objesi oluşturucam.
        const writeTotalErrs = {
          ...errors,
          [e.target.name]: null,
        };
        setErrors(writeTotalErrs);
      })
      .catch((err) => {
        console.log("error verdi", err);

        const writeTotalErrs = {
          ...errors,
          [e.target.name]: err.errors[0],
        };
        setErrors(writeTotalErrs);
      });

    setFormData(newFormData);
  };
  // type'sı checkbox ise eğer direkt olarak e.target.value yu okumaz. o yüzden value tanımladım. type checkbox ise value yu e.target.checked e eşitle dedim. öyle düzeldi checkbox inputum.

  const submitHandler = (e) => {
    e.preventDefault();
    if (isDisable) {
      console.log("formda hatalar var!");
    } else {
      axios
        .post("http://reqres.in/api/users", formData)
        .then((response) => {
          console.log("formu gönderdim", response.data);
          //console.log(response);
          setSonuc([...sonuc, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //console.log("submit kontrolü", formData);
  };

  useEffect(() => {
    setisDisable(true);
    // kuralların hepsi doğruysa
    userKurallar.isValid(formData).then((valid) => {
      console.log("valid", valid);
      setisDisable(!valid);
    });
  }, [formData]);
  // tek div olması gerekiyor mesela form divi. yeni bir div ekleyebilmek için fragment denilen <></> bunun içine alıyorum en en en dışa. sonra artık formun altına yeni div ekleyebilirim.

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name-Surname</label>
          <input
            onChange={changeHandler}
            type="text"
            name="name"
            value={formData.name}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">E-Mail</label>
          <input
            onChange={changeHandler}
            type="email"
            name="email"
            value={formData.email}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="pass">Key Pls</label>
          <input
            onChange={changeHandler}
            type="password"
            name="pass"
            value={formData.pass}
          />
          {errors.pass && <p>{errors.pass}</p>}
        </div>
        <div>
          <label htmlFor="terms">Kullanım Şartları</label>
          <input
            onChange={changeHandler}
            type="checkbox"
            name="terms"
            checked={formData.terms}
          />
          {errors.terms && <p>{errors.terms}</p>}
        </div>
        <button type="submit" disabled={!isDisable}>
          SEND
        </button>
      </form>
      <ul>
        {sonuc.map((sonuc) => {
          return <li key={sonuc.id}>{sonuc.name}</li>;
        })}
      </ul>
    </>
  );
};
export default Form;

// DISABLE değilse then valid setdisable(değil) ; disable (true ise) catch setdisable(true) hatayı yakala ve error yaz uyarı ver.
// BU KONUDA DİSABLE KISMI VE ERROR EKLEME EN ZOR KISIM OLDU!
// ERRORLARI DA YİNE CATCH DE TANIMLAYIP YAKALAYIP YAZDIRIYORUM. [e.target.name]: err.errors(0) hangi hata varsa objede bir array olarak tutuyor  error(0) sayesinde.
