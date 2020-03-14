from octogone import db


class OctogonesGameRuleProfileAssociation(db.Model):
    """
    Octogone Model
    """
    octogone_id = db.Column(
              db.Integer,
              db.ForeignKey("octogone.id"),
              primary_key=True
              )
    game_rule_profile_id = db.Column(
              db.Integer,
              db.ForeignKey("game_rule_profile.id"),
              primary_key=True
              )
