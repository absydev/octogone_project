from pprint import pprint


def subparser_install(subparser):
    parser_octogone_get = subparser.add_parser(
        'get',
        help='Get a octogone'
    )
    parser_octogone_get.set_defaults(func=get_octogone)
    parser_octogone_get.add_argument('octogone_id', help='The id of the octogone u want get')


def get_octogone(octogone_id, **kwargs):
    pprint(octogone_id)
    return octogone_id
