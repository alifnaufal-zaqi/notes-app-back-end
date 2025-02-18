const {
    PostAuthenticationPayload, 
    PutAuthenticationPayload, 
    DeleteAuthenticationPayload
} = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AuthenticationsValidator = {
    validatePostAuthenticationPayload: (payload) => {
        const validationResult = PostAuthenticationPayload.validate(payload);

        if(validationResult.error){
            throw new InvariantError(validationResult.error.message);
        }
    },
    validatePutAuthenticationPayload: (payload) => {
        const validationResult = PutAuthenticationPayload.validate(payload);


        if(validationResult.error){
            throw new InvariantError(validationResult.error.message);
        };
    },
    validateDeleteAuthenticationPayload: (payload) => {
        const validationResult = DeleteAuthenticationPayload.validate(payload);

        if(validationResult.error){
            throw new InvariantError(validationResult.error.message);
        }
    }
};

module.exports = AuthenticationsValidator;