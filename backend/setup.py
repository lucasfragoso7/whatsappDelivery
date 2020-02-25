from cx_Freeze import setup, Executable
setup(
    name = "servidorMoveZap",
    version = "1.0.0",
    options = {"build_exe": {
        'packages': ["selenium","time","sqlite3","flask","json","random","os"],
        'include_msvcr': True,
    }},
      executables = [Executable(
                   script='servidorMoveZap.py',
                   base=None,
                   icon=None
                   )
                  ]
    )