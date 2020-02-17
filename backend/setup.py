from cx_Freeze import setup, Executable
setup(
    name = "MoveZap",
    version = "1.0.0",
    options = {"build_exe": {
        'packages': ["selenium","time", "sqlite3", "flask","json","random"],
        'include_msvcr': True,
    }},
      executables = [Executable(
                   script='moveZapRest.py',
                   base=None,
                   icon=None
                   )
                  ]
    )