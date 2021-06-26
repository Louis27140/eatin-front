const mandatory = v => !!v ||'Champs requis'

const regexMail = v => /.+@.+\..+/.test(v) || 'L\'email est invalide'

const regexPassword = v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(v) || 'Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et un caractère spécial'

const regexPhone = v => /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(v) || 'le numéro de téléphone est invalide'

const regexZipCode = v => /^\d{5}(?:[-\s]\d{4})?$/.test(v) || 'Le code postal est invalide'

const maxLength = v => v && v.length < 32 || 'Le champs ne doit pas dépassé 32 caractère'

export default {
    mandatory,
    regexMail,
    regexPassword,
    regexPhone,
    regexZipCode,
    maxLength,
}