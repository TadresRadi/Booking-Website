import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { Country, State } from "country-state-city";
import { useLocation, useNavigate } from "react-router-dom";

const paymentMethods = [
  { value: "", label: "--select--" },
  { value: "mastercard", label: "MasterCard" },
  { value: "paypal", label: "PayPal" },
  { value: "visa", label: "Visa" },
];

export default function PaymentForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // بيانات الحجز قادمة من صفحة الحجز (Booking)
  const { booking } = location.state || {};

  // حماية: لو booking غير متوفرة، redirect
  useEffect(() => {
    if (!booking) navigate("/", { replace: true });
  }, [booking, navigate]);

  // باقي الكود كما كان ...
  const [form, setForm] = useState({
    paymentMethod: "",
    cardNumber: "",
    expiration: "",
    securityCode: "",
    fullName: "",
    country: null,
    billingAddress: "",
    state: null,
    phone: "",
    zip: "",
    remember: false,
    birthDate: "",
    email: "",
  });

  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  // عند تحميل الصفحة، اقرأ بيانات الحجز من localStorage
  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem("bookingUserData") || "{}");
    if (bookingData) {
      setForm(prev => ({
        ...prev,
        fullName: [bookingData.first_name, bookingData.last_name].filter(Boolean).join(" "),
        phone: bookingData.phone || "",
        billingAddress: bookingData.address || "",
        zip: bookingData.zip_code || "",
        email: bookingData.email || "",
        country: countries.find(c =>
          c.label.toLowerCase() === (bookingData.country || "").toLowerCase()
        ) || null,
      }));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (form.country) {
      const stateList = State.getStatesOfCountry(form.country.value).map(
        (state) => ({
          value: state.isoCode,
          label: state.name,
        })
      );
      setStates(stateList);
      setForm((prev) => ({ ...prev, state: null }));
    } else {
      setStates([]);
      setForm((prev) => ({ ...prev, state: null }));
    }
  }, [form.country]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;
    const numericFields = ["cardNumber", "securityCode", "phone"];
    if (numericFields.includes(name)) val = val.replace(/\D/g, "");
    if (name === "expiration") {
      val = val.replace(/\D/g, "");
      if (val.length > 4) val = val.slice(0, 4);
    }
    setForm({ ...form, [name]: val });

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (name === "cardNumber") {
        newErrors.cardNumber = val.length !== 16 && val.length !== 0 ? "Card number must be 16 digits" : "";
      }
      if (name === "securityCode") {
        newErrors.securityCode = val.length !== 3 && val.length !== 0 ? "Security code must be 3 digits" : "";
      }
      if (name === "birthDate") {
        if (val) {
          const today = new Date();
          const birth = new Date(val);
          let age = today.getFullYear() - birth.getFullYear();
          const m = today.getMonth() - birth.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
          newErrors.birthDate = age < 18 ? "You must be 18 or older" : "";
        } else {
          newErrors.birthDate = "Birth date is required";
        }
      }
      if (name !== "cardNumber" && name !== "securityCode" && name !== "birthDate") {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "paymentMethod",
      "cardNumber",
      "securityCode",
      "fullName",
      "birthDate",
      "country",
      "state",
      "billingAddress",
      "phone",
    ];
    const emptyFields = requiredFields.filter((field) => {
      if (field === "country" || field === "state") return form[field] === null;
      return !form[field] || form[field] === "";
    });
    if (emptyFields.length > 0) {
      alert("Please fill all required fields.");
      return;
    }
    const hasErrors = ["cardNumber", "securityCode", "birthDate"].some(
      (key) => errors[key] && errors[key] !== ""
    );
    if (hasErrors) {
      alert("Please fix validation errors before submitting.");
      return;
    }
    // إرسال البيانات
    const dataToSend = {
      payment_method: form.paymentMethod,
      card_number: form.cardNumber,
      expiration: form.expiration,
      security_code: form.securityCode,
      full_name: form.fullName,
      birth_date: form.birthDate,
      country: form.country?.value || "",
      state: form.state?.value || "",
      billing_address: form.billingAddress,
      zip_code: form.zip,
      phone: form.phone,
      remember: form.remember,
      email: form.email,
    };

    try {
      const token = localStorage.getItem("access");
      const response = await fetch("http://localhost:8000/api/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Failed to submit payment: " + (errorData.message || "Unknown error"));
        return;
      }

      await response.json();

      // بعد الدفع الناجح انتقل لصفحة التأكيد وابعث بيانات الحجز معها
      navigate("/after-reservation", {
        state: { booking }
      });

      setForm({
        paymentMethod: "",
        cardNumber: "",
        expiration: "",
        securityCode: "",
        fullName: "",
        country: null,
        billingAddress: "",
        state: null,
        phone: "",
        zip: "",
        remember: false,
        birthDate: "",
        email: "",
      });
      setErrors({});
    } catch (error) {
      alert("Error submitting form: " + error.message);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="border rounded p-4 text-center">
          <h4 className="text-primary mb-4">PAYMENT METHODS</h4>
          <div>
            <img
              src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
              alt="MasterCard"
              className="mx-2"
            />
            <img
              src="https://img.icons8.com/color/48/000000/paypal.png"
              alt="PayPal"
              className="mx-2"
            />
            <img
              src="https://img.icons8.com/color/48/000000/visa.png"
              alt="Visa"
              className="mx-2"
            />
          </div>
        </Col>
        <Col md={8} className="border rounded p-4">
          <h3 className="text-primary mb-4">PAYMENT FORM</h3>
          <Form onSubmit={handleSubmit}>
            <h5 className="mb-3">PAYMENT INFORMATION</h5>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="paymentMethod">
                <Form.Label>Select a payment method</Form.Label>
                <Form.Select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                >
                  {paymentMethods.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="expiration">
                <Form.Label>Expiration date (MMYY)</Form.Label>
                <Form.Control
                  type="text"
                  name="expiration"
                  placeholder="MMYY"
                  maxLength={4}
                  value={form.expiration}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="cardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  value={form.cardNumber}
                  maxLength={16}
                  onChange={handleChange}
                />
                {errors.cardNumber && (
                  <div className="text-danger small">{errors.cardNumber}</div>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId="securityCode">
                <Form.Label>Security Code (CVV)</Form.Label>
                <Form.Control
                  type="text"
                  name="securityCode"
                  value={form.securityCode}
                  maxLength={3}
                  onChange={handleChange}
                />
                {errors.securityCode && (
                  <div className="text-danger small">{errors.securityCode}</div>
                )}
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="birthDate">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
              />
              {errors.birthDate && (
                <div className="text-danger small">{errors.birthDate}</div>
              )}
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="country">
                <Form.Label>Country</Form.Label>
                <Select
                  options={countries}
                  value={form.country}
                  onChange={(val) => setForm({ ...form, country: val })}
                  placeholder="Select country"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="state">
                <Form.Label>State</Form.Label>
                <Select
                  options={states}
                  value={form.state}
                  onChange={(val) => setForm({ ...form, state: val })}
                  placeholder="Select state"
                  isDisabled={!form.country}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="billingAddress">
              <Form.Label>Billing Address</Form.Label>
              <Form.Control
                type="text"
                name="billingAddress"
                value={form.billingAddress}
                onChange={handleChange}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="zip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={form.phone}
                  maxLength={11}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="remember">
              <Form.Check
                type="checkbox"
                label="Remember payment method"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit Payment
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}