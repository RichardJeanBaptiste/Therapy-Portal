import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const TherapistSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Role: String,
    DatesAvailable: Array,
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


//userSchema.pre - check if username exists 

const User = mongoose.models.User || mongoose.model("User", userSchema);

const therapists = mongoose.models.therapists || mongoose.model("therapists", TherapistSchema, "therapists");

const clients = mongoose.models.clients || mongoose.model("clients", ClientSchema, "clients");


module.exports =  { User, therapists, clients};