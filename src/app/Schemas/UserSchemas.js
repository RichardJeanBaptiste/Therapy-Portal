import mongoose from 'mongoose';


const TherapistSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Role: String,
    DatesAvailable: Array,
    DatesScheduled: Array,
    Clients: Array,
    Info: Array,
})

const ClientSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Role: String,
    DatesReserved: Array,
    Therapists: Array,
    Info: Array,
})

const calSchema = new mongoose.Schema({
    name: String,
    dates: Array,
});



//userSchema.pre - check if username exists 

const therapists = mongoose.models.therapists || mongoose.model("therapists", TherapistSchema, "therapists");

const clients = mongoose.models.clients || mongoose.model("clients", ClientSchema, "clients");

const calenders = mongoose.models.calenders || mongoose.model("calenders", calSchema, "calendars");

module.exports =  { therapists, clients, calenders};