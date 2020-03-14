from octogone.app import db


class DatabaseException(Exception):
    """
    Exception raised when the flush fails
    """
    pass


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
        raise DatabaseException
