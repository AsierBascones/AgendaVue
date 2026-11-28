// 1. Inicializar Firebase (sustituye por tus datos)
const firebaseConfig = {
    apiKey: "AIzaSyBl4GVxkFNUKUVC3T_6l64YvwOc_3M053A",
    authDomain: "animezoneclase.firebaseapp.com",
    projectId: "animezoneclase",
    storageBucket: "animezoneclase.firebasestorage.app",
    messagingSenderId: "434368719555",
    appId: "1:434368719555:web:a653e19818a98d1bba9076"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 2. Registrar Vuefire (versión Firestore)
Vue.use(Vuefire.firestorePlugin);

new Vue({
    el: '#app',
    data: {
        contacts: [],          // Vuefire lo mantiene sincronizado con Firestore
        newContact: { name: '', email: '', phone: '' },
        errorMessage: ''
    },
    // 3. Enlace en tiempo real con la colección
    firestore: {
        contacts: db.collection('contacts').orderBy('name')
    },
    methods: {
        addContact: function () {
            if (!this.newContact.name.trim() || !this.newContact.email.trim() || !this.newContact.phone.trim()) {
                this.errorMessage = 'Por favor, rellena todos los campos.';
                return;
            }

            // Persistir en Firestore (la lista se actualiza sola)
            db.collection('contacts').add({
                name: this.newContact.name.trim(),
                email: this.newContact.email.trim(),
                phone: this.newContact.phone.trim()
            }).then(() => {
                this.newContact = { name: '', email: '', phone: '' };
                this.errorMessage = '';
            }).catch((error) => {
                this.errorMessage = 'Error al guardar: ' + error.message;
            });
        },
        deleteContact: function (id) {
            db.collection('contacts').doc(id).delete()
                .catch((error) => {
                    this.errorMessage = 'Error al borrar: ' + error.message;
                });
        }
    }
});