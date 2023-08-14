import { HashRouter, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login/Login"
import { Home } from "./pages/Home/Home"
import { AuthProvider } from "./hooks/auth"
import { AuthPage } from "./components/AuthPage/AuthPage"
import { Encuestas } from "./pages/Encuestas/Encuestas"
import { Encuesta } from "./pages/Encuesta/Encuesta"
import { Resultado } from "./pages/Resultado/Resultado"
import { Estudiantes } from "./pages/Estudiantes/Estudiantes"
import { EstudianteResultados } from "./pages/EstudianteResultados/EstudianteResultados"
import { Grupos } from "./pages/Grupos/Grupos"
import { Grupo } from "./pages/Grupo/Grupo"
import { Informacion } from "./pages/Informacion/Informacion"

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
