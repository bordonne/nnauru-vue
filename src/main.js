import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'

const i18nStrings = {
  app_title: "SOS Planète",
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
    header: "Cette semaine..."
  },
  me: {
    header: "Cette semaine...",
    points: "points"
  }
}

createApp(App).use(i18n, i18nStrings).mount('#app')
