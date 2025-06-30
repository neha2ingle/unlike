import mongose from 'mongose';
import bcrypt from 'bcryptjs';

const userSchema = new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required:true,
        enum:['male','female']
    },
    genderPreference:{
        type: String,
        required:true,
        enum:['male','female','both']
    },
    bio: {type: String, default:''},
    image: {type: String, default:''},
    likes: [{
        type: mongose.Schema.Types.ObjectId,
        ref:'User'
    }],
    disLikes: [{
        type: mongose.Schema.Types.ObjectId,
        ref:'User'
    }],
    matches: [{
        type: mongose.Schema.Types.ObjectId,
        ref:'User'
    }]
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    // hash only if modified
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongose.model("User", userSchema);

export default User;