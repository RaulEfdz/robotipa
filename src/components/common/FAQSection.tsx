"use client";

import React from "react";

const FAQSection = () => {
  return (
    <section>
      {/* FAQ */}
      <div className=" py-10 sm:px-8 lg:px-32 lg:py-64 mx-auto bg-lego-primary">
        {/* Grid */}
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="max-w-xs">
              <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-white">
                Preguntas
                <br />
                Frecuentes
              </h2>
              <p className="mt-1 hidden md:block text-white/80">
                Respuestas a las preguntas más frecuentes.
              </p>
            </div>
          </div>
          {/* End Col */}

          <div className="md:col-span-3">
            {/* Accordion */}
            <div className="hs-accordion-group divide-y divide-lego-secondary/50">
              <div
                className="hs-accordion pb-3 active"
                id="hs-basic-with-title-and-arrow-stretched-heading-one"
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white rounded-lg transition hover:text-lego-accent focus:outline-hidden focus:text-lego-accent"
                  aria-expanded="true"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                >
                  ¿Puedo cancelar en cualquier momento?
                  {/* Replace these inline SVGs with Lucide ChevronDown and ChevronUp icons */}
                  {/* Placeholder for icons */}
                  <svg
                    className="hs-accordion-active:hidden block shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <svg
                    className="hs-accordion-active:block hidden shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                  className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  role="region"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                >
                  <p className="text-white/80">
                    Sí, puedes cancelar en cualquier momento sin que se te hagan
                    preguntas, pero agradeceríamos mucho si nos das tu opinión.
                  </p>
                </div>
              </div>

              <div
                className="hs-accordion pt-6 pb-3"
                id="hs-basic-with-title-and-arrow-stretched-heading-two"
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white rounded-lg transition hover:text-lego-accent focus:outline-hidden focus:text-lego-accent"
                  aria-expanded="false"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two"
                >
                  Mi equipo tiene créditos. ¿Cómo los usamos?
                  <svg
                    className="hs-accordion-active:hidden block shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <svg
                    className="hs-accordion-active:block hidden shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-two"
                  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  role="region"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two"
                >
                  <p className="text-white/80">
                    Una vez que tu equipo se suscribe a un plan. Aquí es donde
                    nos sentamos, tomamos un café y afinamos los detalles.
                  </p>
                </div>
              </div>

              <div
                className="hs-accordion pt-6 pb-3"
                id="hs-basic-with-title-and-arrow-stretched-heading-three"
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white rounded-lg transition hover:text-lego-accent focus:outline-hidden focus:text-lego-accent"
                  aria-expanded="false"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three"
                >
                  ¿Cómo funciona la tarifa de Preline?
                  <svg
                    className="hs-accordion-active:hidden block shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <svg
                    className="hs-accordion-active:block hidden shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-three"
                  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  role="region"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three"
                >
                  <p className="text-white/80">
                    Nuestras suscripciones son escalonadas. Entender la tarea en
                    cuestión y resolver los detalles es clave.
                  </p>
                </div>
              </div>

              <div
                className="hs-accordion pt-6 pb-3"
                id="hs-basic-with-title-and-arrow-stretched-heading-four"
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white rounded-lg transition hover:text-lego-accent focus:outline-hidden focus:text-lego-accent"
                  aria-expanded="false"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four"
                >
                  ¿Qué tan seguro es Preline?
                  <svg
                    className="hs-accordion-active:hidden block shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <svg
                    className="hs-accordion-active:block hidden shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-four"
                  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  role="region"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four"
                >
                  <p className="text-white/80">
                    Proteger los datos que confías a Preline es nuestra
                    prioridad número uno. Esta parte es crucial para mantener el
                    proyecto en línea hasta su finalización.
                  </p>
                </div>
              </div>

              <div
                className="hs-accordion pt-6 pb-3"
                id="hs-basic-with-title-and-arrow-stretched-heading-five"
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white rounded-lg transition hover:text-lego-accent focus:outline-hidden focus:text-lego-accent"
                  aria-expanded="false"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five"
                >
                  ¿Cómo obtengo acceso a un tema que compré?
                  <svg
                    className="hs-accordion-active:hidden block shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <svg
                    className="hs-accordion-active:block hidden shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-five"
                  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  role="region"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five"
                >
                  <p className="text-white/80">
                    Si pierdes el enlace de un tema que compraste, no te
                    preocupes. Puedes iniciar sesión en tu cuenta, tocar tu
                    avatar en la esquina superior derecha y seleccionar Compras.
                    Si no creaste un inicio de sesión o no recuerdas la
                    información, puedes usar nuestra página de re-descarga, solo
                    recuerda usar el mismo correo electrónico con el que hiciste
                    tus compras.
                  </p>
                </div>
              </div>

              <div
                className="hs-accordion pt-6 pb-3"
                id="hs-basic-with-title-and-arrow-stretched-heading-six"
              >
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-white rounded-lg transition hover:text-lego-accent focus:outline-hidden focus:text-lego-accent"
                  aria-expanded="false"
                  aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-six"
                >
                  Actualizar tipo de licencia
                  <svg
                    className="hs-accordion-active:hidden block shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <svg
                    className="hs-accordion-active:block hidden shrink-0 size-5 text-lego-accent group-hover:text-lego-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </button>
                <div
                  id="hs-basic-with-title-and-arrow-stretched-collapse-six"
                  className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  role="region"
                  aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-six"
                >
                  <p className="text-white/80">
                    Puede haber ocasiones en las que necesites actualizar tu
                    licencia desde el tipo original que compraste y tenemos una
                    solución que garantiza que puedas aplicar el costo original
                    de compra a la nueva licencia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
