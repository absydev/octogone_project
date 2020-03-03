#!/usr/bin/env python
# -*- coding: utf-8 -*-

from argparse import ArgumentParser

from octogone.cli.octogone import subparser_install as octogone_subparser

MAIN_COMMANDS = [
    ('octogone', octogone_subparser),
]

def main():
    """
    Main entry point
    """
    parser = ArgumentParser()

    subparser = parser.add_subparsers(dest='main_command', help='The main command')
    subparser.required = True

    for command in MAIN_COMMANDS:
        cmd_parser = subparser.add_parser(command[0])
        cmd_subparser = cmd_parser.add_subparsers(dest='sub_command', help='The {0} sub-command'.format(command[0]))
        cmd_subparser.required = True
        command[1](cmd_subparser)

    argument = parser.parse_args()
    argument.func(**vars(argument))
