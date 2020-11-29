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
    connexion_error: "Erreur: mauvais pseudo ou mot de passe"
  },
  credits: {
    toggle: "Crédits",
    real: "Application réalisée par :",
    resources: "Ressources graphiques utilisées :"
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
    world_header: "Si tout le monde faisait comme nous, il faudrait...",
    planets: "Planètes",
    overshoot_day: "Jour du dépassement",
    with: "avec SOS Planète",
    without: "sans SOS Planète"
  }
}

createApp(App).use(i18n, i18nStrings).mount('#app')
