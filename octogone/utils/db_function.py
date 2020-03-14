from octogone.app import db


def flush():
    """
    Flush db transaction
    :raise: Exception catch by session.flush()
    :return: None
    """
    try:
        db.session.flush()
    except:
        db.session.rollback()
        raise