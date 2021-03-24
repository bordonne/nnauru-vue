import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'

const i18nStrings = {
  app_title: "SOS Planète",
  mobile: {
    app_link_title: "Sur mobile, utilisez l'application :",
    dowload: "Télécharger"
  },
  login: {
    subtitle: "Agissons pour le vivant",
    placeholder_username: "Entrer votre pseudo...",
    placeholder_password: "Mot de passe...",
    submit_button: "Connexion",
    connection: "Connexion...",
    connection_error: "Erreur: mauvais pseudo ou mot de passe",
    period_error: `La saisie pour cette semaine n'est pas encore ouverte.</br>
    Veuillez contacter votre administrateur ou envoyer un mail à support@nnauru.fr`
  },
  credits: {
    toggle: "Crédits",
    real: "Application réalisée par :",
    real_text: "© Nnauru 2020",
    resources: "Ressources graphiques utilisées :",
    resources_text: "Freepik, Brgfx",
    links: `<a href="https://www.freepik.com/free-photos-vectors/floral">Floral vector created by freepik - www.freepik.com</a><br/>
      <a href="https://www.freepik.com/free-photos-vectors/Border">Border vector created by brgfx - www.freepik.com</a><br/>
      <a href="https://www.freepik.com/free-photos-vectors/Banner">Banner vector created by brgfx - www.freepik.com</a><br/>
      <a href="https://www.freepik.com/free-photos-vectors/Frame">Frame vector created by brgfx - www.freepik.com</a><br/>
      <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>`
  },
  nav: {
    fiche: "Ma fiche",
    me: "Moi, ",
    team: "Toutes les équipes",
    impact: "Impact"
  },
  confirm_logout: "Souhaitez-vous vous déconnecter ?",
  fiche: {
    header: "Cette semaine...",
    help_header: "Aide"
  },
  me: {
    header: "Cette semaine...",
    points: "points"
  },
  team: {
    nav_top: "Top 10",
    nav_total_week: "Total semaine",
    nav_total: "Total cumulé",
    points: "points"
  },
  impact: {
    impact: "Impact",
    overshoot: "Dépassement",
    modal: "C'est quoi ?",
    header: "Impact de nos actions",
    bravo: "Bravo !",
    co2: "eq",
    pollution: "kg",
    water: "L",
    world: {
      header: "Si tout le monde faisait comme nous, il faudrait...",
      planets: "Planètes",
      overshoot_day: "Jour du dépassement",
      with: "avec SOS Planète",
      without: "sans SOS Planète",
      modal: `<p>C'est la date à partir de laquelle <span style='color:white'>l'empreinte écologique</span> dépasse <span style='color:white'>la biocapacité</span> de la planète.</p>
      <p>L'empreinte écologique caractérise la surface de la Terre utilisée par l'Homme pour pêcher, élever, cultiver, déboiser, construire et brûler des énergies fossiles.</br>
      <span style='color:white'>La biocapacité</span>, quant à elle, représente la surface de la planète nécessaire pour faire face à ces pressions.</p>
      <p>Depuis les années 1970, la date du Jour du dépassement se dégrade.</br>
      En 1998, elle avait lieu le 30 septembre.</br>
      En 2019, elle arrive deux mois plus tôt: le 29 juillet.</p>
      <p>Cette date est marquée cette année par une nouvelle augmentation des émissions de CO<sub>2</sub>.</p>`
    }
  }
}

createApp(App).use(i18n, i18nStrings).mount('#app')
