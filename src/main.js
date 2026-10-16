import days from "dayjs";
import _ from "lodash";

document.addEventListener("DOMContentLoaded", () => {
  let gepjarmuvek = [
    {
      rendszam: "AAA-423",
      marka: "Trabant",
      evjarat: 2001,
      muszakiE: true,
    },
    {
      rendszam: "ABC-123",
      marka: "Suzuki Swift",
      evjarat: 2003,
      muszakiE: true,
    },
    {
      rendszam: "DEF-456",
      marka: "Opel Astra",
      evjarat: 2015,
      muszakiE: false,
    },
    {
      rendszam: "GHI-789",
      marka: "Ford Focus",
      evjarat: 2018,
      muszakiE: true,
    },
    {
      rendszam: "JKL-234",
      marka: "Volkswagen Golf",
      evjarat: 2012,
      muszakiE: false,
    },
    {
      rendszam: "MNO-567",
      marka: "Toyota Corolla",
      evjarat: 2020,
      muszakiE: true,
    },
  ];

  const tablaBody = document.getElementById("gepjarmuTablaBody");
  const form = document.getElementById("gepjarmuForm");
  const rendszam = document.getElementById("rendszam");
  const marka = document.getElementById("marka");
  const evjarat = document.getElementById("evjarat");
  const muszakiE = document.getElementById("muszakiE");
  const aktualisDatum = document.getElementById("aktualisDatum");
  const rendezes = document.getElementById("rendezes");
  aktualisDatum.textContent = days().format("YYYY. MM. DD.");

  function tablazatFrissites() {
    tablaBody.innerHTML = "";
    const rendezettGepjarmuvek = _.orderBy(
      gepjarmuvek,
      ["evjarat"],
      [rendezes.value]
    );
    rendezettGepjarmuvek.forEach((gepjarmu) => {
      const tr = document.createElement("tr");
      const tdRendszam = document.createElement("td");
      tdRendszam.textContent = gepjarmu.rendszam;
      const tdMarka = document.createElement("td");
      tdMarka.textContent = gepjarmu.marka;
      const tdEvjarat = document.createElement("td");
      tdEvjarat.textContent = gepjarmu.evjarat;
      const tdMuszakiE = document.createElement("td");
      const kapcsoloDoboz = document.createElement("div");
      kapcsoloDoboz.className = "form-check form-switch";
      const kapcsolo = document.createElement("input");
      kapcsolo.type = "checkbox";
      kapcsolo.className = "form-check-input";
      kapcsolo.role = "switch";
      kapcsolo.checked = gepjarmu.muszakiE;
      const allapotSzoveg = document.createElement("span");
      allapotSzoveg.textContent = gepjarmu.muszakiE
        ? "Érvényes"
        : "Nem érvényes";
      kapcsolo.addEventListener("change", () => {
        gepjarmu.muszakiE = kapcsolo.checked;
        tablazatFrissites();
      });
      kapcsoloDoboz.appendChild(kapcsolo);
      kapcsoloDoboz.appendChild(allapotSzoveg);
      tdMuszakiE.appendChild(kapcsoloDoboz);
      const tdMuvelet = document.createElement("td");
      const torlesGomb = document.createElement("button");
      torlesGomb.type = "button";
      torlesGomb.className = "btn btn-secondary btn-sm";
      torlesGomb.textContent = "Törlés";
      torlesGomb.addEventListener("click", () => {
        gepjarmuvek = gepjarmuvek.filter(
          (elem) => elem.rendszam !== gepjarmu.rendszam
        );
        tablazatFrissites();
      });
      tdMuvelet.appendChild(torlesGomb);
      tr.appendChild(tdRendszam);
      tr.appendChild(tdMarka);
      tr.appendChild(tdEvjarat);
      tr.appendChild(tdMuszakiE);
      tr.appendChild(tdMuvelet);
      tablaBody.appendChild(tr);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const ujRendszam = rendszam.value.trim().toUpperCase();
    const ujMarka = marka.value.trim();
    const ujEvjarat = Number(evjarat.value);
    const ujMuszakiE = muszakiE.checked;
    if (!ujRendszam || !ujMarka || !evjarat.value) {
      alert("Tölts ki minden mezőt!");
      return;
    }
    let letezik = false;
    for (let i = 0; i < gepjarmuvek.length; i++) {
      if (gepjarmuvek[i].rendszam === ujRendszam) {
        letezik = true;
      }
    }
    if (letezik) {
      alert("Ezzel a rendszámmal már létezik gépjármű a nyilvántartásban!");
      return;
    }
    const ujGepjarmu = {
      rendszam: ujRendszam,
      marka: ujMarka,
      evjarat: ujEvjarat,
      muszakiE: ujMuszakiE,
    };
    gepjarmuvek.push(ujGepjarmu);
    gepjarmuvek = _.uniqBy(gepjarmuvek, "rendszam");
    form.reset();
    tablazatFrissites();
  });

  rendezes.addEventListener("change", () => {
    tablazatFrissites();
  });
  tablazatFrissites();
});
