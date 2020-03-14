from octogone import create_app, db
from octogone.models import User, Profile, GameProfile, GameRule, Game, GameRuleProfile, Octogone, Season

application = create_app()


@application.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "User": User,
        "Profile": Profile,
        "GameProfile": GameProfile,
        "GameRuleProfile": GameRuleProfile,
        "GameRule": GameRule,
        "Game": Game,
        "Octogone": Octogone,
        "Season": Season
    }


if __name__ == "__main__":
    application.run(host="127.0.0.1", debug=True)
