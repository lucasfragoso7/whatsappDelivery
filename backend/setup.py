from cx_Freeze import setup, Executable
setup(
    name = "testeFirefox",
    version = "1.0.0",
    options = {"build_exe": {
        'packages': ["selenium","time","flask","json"],
        'include_msvcr': True,
    }},
      executables = [Executable(
                   script='testeFirefox.py',
                   base=None,
                   icon=None
                   )
                  ]
    )