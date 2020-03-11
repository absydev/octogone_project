FROM python

RUN apt-get update

RUN mkdir /octogone

RUN mkdir /setup

COPY octogone /octogone

COPY setup.py /setup

COPY requirements.txt /setup

RUN python /setup/setup.py install

RUN pip install --no-cache-dir -r /setup/requirements.txt

WORKDIR /octogone

ENV FLASK_DEBUG=1

ENV FLASK_ENV="docker"

EXPOSE 5000
