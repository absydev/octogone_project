from flask_restx import fields

profile_fields = {
    'global_mmr': fields.Float(descrition='The glodal mmr of the user'),
    'trust_score': fields.Float(descrition='Is this user toxic ?'),
    'pussy_score': fields.Float(descrition='Ratio matches accepted/declined'),
}

user_fields = {
    'username': fields.String(description='The username'),
    'email': fields.String(description='The email address'),
    'creation_datetime': fields.DateTime(description='When the user was created'),
    'modification_datetime': fields.DateTime(description='When the user was last modified'),
    'profile': fields.Nested(profile_fields)
}