new Vue({
    el: '#app',
    data: {
        // Lista inicial de contactos (a. Mostrar contactos)
        contacts: [
            {
                name: 'Ofelia Tonelaje',
                email: 'ofelia.ton@deusto.es',
                phone: '666666666'
            },
            {
                name: 'Lorena Sainz de Baranda',
                email: 'lorena.s@opendeusto.es',
                phone: '888888888'
            },
            {
                name: 'Juan Carlos de la Torre',
                email: 'juanca.delat@opendeusto.es',
                phone: '999999999'
            }
        ],
        // Objeto vinculado al formulario (b. Crear nuevo contacto)
        newContact: {
            name: '',
            email: '',
            phone: ''
        },
        errorMessage: ''
    },
    methods: {
        addContact: function () {
            // Validación básica para evitar contactos vacíos
            if (!this.newContact.name.trim() || !this.newContact.email.trim() || !this.newContact.phone.trim()) {
                this.errorMessage = 'Por favor, rellena todos los campos.';
                return;
            }

            // Añadimos copia del nuevo contacto a la lista
            this.contacts.push({
                name: this.newContact.name.trim(),
                email: this.newContact.email.trim(),
                phone: this.newContact.phone.trim()
            });

            // Limpiamos los campos y el mensaje de error
            this.newContact.name = '';
            this.newContact.email = '';
            this.newContact.phone = '';
            this.errorMessage = '';
        },
        deleteContact: function (index) {
            // c. Borrar contacto según su posición en el array
            this.contacts.splice(index, 1);
        }
    }
});