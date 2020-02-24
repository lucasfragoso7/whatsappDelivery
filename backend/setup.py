from cx_Freeze import setup, Executable
setup(
    name = "moveZapRest",
    version = "1.1.0",
    options = {"build_exe": {
        'packages': ["selenium","time", "sqlite3", "flask","json","random", "os"],
        'include_msvcr': True,
    }},
      executables = [Executable(
                   script='moveZapRest.py',
                   base=None,
                   icon=None
                   )
                  ]
    )