import { HashRouter, Route, Routes } from "react-router-dom"
import { Login } from "./components/Login/Login"
import { Home } from "./components/Home/Home"
import { AuthProvider } from "./hooks/auth"
import { AuthPage } from "./hooks/AuthPage"
import { Encuestas } from "./components/Encuestas/Encuestas"
import { Encuesta } from "./components/Encuesta/Encuesta"
import { Resultado } from "./components/Resultado/Resultado"
import { Estudiantes } from "./components/Estudiantes/Estudiantes"
import { EstudianteResultados } from "./components/EstudianteResultados/EstudianteResultados"
import { Grupos } from "./components/Grupos/Grupos"
import { Grupo } from "./components/Grupo/Grupo"
import { Informacion } from "./components/Informacion/Informacion"

function App() {

  //UserTypes:
  // alumno
  // docente
  // root

  const pages = [
    { 
      path: '/:userType?', 
      componet: <Login />, 
      isPublic: true
    },
    { 
      path: '/*', 
      componet: <AuthPage></AuthPage>, 
      isPublic: true
    },
    { 
      path: '/home', 
      componet: <Home />, 
      isPublic: false,
      roles: ['alumno', 'docente', 'root']
    },
    { 
      path: '/encuestas', 
      componet: <Encuestas />, 
      isPublic: false,
      roles: ['alumno']
    },
    { 
      path: '/encuesta/:idSurvey', 
      componet: <Encuesta />, 
      isPublic: false,
      roles: ['alumno']
    },
    { 
      path: '/resultados/:nameSurvey/:idSurvey', 
      componet: <Resultado />, 
      isPublic: false,
      roles: ['alumno']
    },
    { 
      path: '/informacion', 
      componet: <Informacion />, 
      isPublic: false,
      roles: ['alumno', 'docente']
    },
    { 
      path: '/estudiantes', 
      componet: <Estudiantes />, 
      isPublic: false,
      roles: ['docente']
    },
    { 
      path: '/grupos', 
      componet: <Grupos />, 
      isPublic: false,
      roles: ['docente']
    },
    { 
      path: '/grupo/:idGroup', 
      componet: <Grupo />, 
      isPublic: false,
      roles: ['docente']
    },
    { 
      path: '/estudiante/resultados/:idStudent', 
      componet: <EstudianteResultados />, 
      isPublic: false,
      roles: ['docente']
    },
  ]

  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Routes>
            {pages.map((page, i)=>{
              if(page.isPublic)
                return (<Route path={page.path} element={page.componet} key={i} />)
              else
                return (<Route path={page.path} element={<AuthPage roles={page.roles}>{page.componet}</AuthPage>} key={i}/>)
            })}
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App
