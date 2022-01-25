# MyBookie

## Coming Soon...

**MyBookie** is an appointment setter Full Stack Web Application Featuring:

Front End

- JWT
- React.js
- Tailwindcss
- Tailstrap (a Tailwindcss component library)

Back End

- JWT
- Bcrypt
- Python Flask Server
- PyMongo (MongoDB driver for Python)
- MongoEngine (DOM: Document-Object Mapper)W

## Installation

Currently this project isn't configured as a Python package so manual installation of the installed packages is required

### Clone Repo

- HTTPS:
  - `git clone https://github.com/iiTONELOC/my-bookie.git`
- SSH:
  - `git clone git@github.com:iiTONELOC/my-bookie.git`
- GitHub Desktop:
  - [Open with GitHub Desktop](x-github-client://openRepo/https://github.com/iiTONELOC/my-bookie)

### Configure Python virtual env

The env runs `version = 3.10.2` and is the recommended Python version for your environment

- From the root of the project:

  ```sh
  cd flask_server
  py install_virt.py
  ```

- Activate the virtual environment

  On Windows:

  ```sh
  venv\Scripts\activate
  ```

- Run the run_install script from inside of the virtual environment.  
  If the last command was successful, there should be a (venv) visible in the CLI

  ```sh
  py run_install.py
  ```

## Running the Server

- Activate the virtual environment

  On Windows:

  ```sh
  venv\Scripts\activate
  ```

- Start Server

  ```sh
  py main.py
  ```
