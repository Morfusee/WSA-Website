import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="h-[100dvh] w-screen">
      <div className="flex md:flex-row w-full h-full">
        <section className="flex flex-col px-8 sm:p-20 xl:w-[50%] md:w-4/5">
          <MobileWaves />
          <div className="2xl:px-32 md:px-20 max-w-4xl m-auto z-10 p-10 rounded-lg shadow-lg sm:shadow-none bg-white sm:bg-transparent">
            <div className="w-full flex flex-col gap-2 py-5 ">
              <h1 className="xl:text-5xl md:text-4xl text-2xl font-bold">
                TeacherHub
              </h1>
              <p className="xl:text-lg text-gray-600">
                Sign in to your account to continue using TeacherHub
              </p>
            </div>
            <LoginForm
              setUsername={setUsername}
              setPassword={setPassword}
              loading={loading}
              failed={failed}
            />
            <div className="w-full flex justify-center pt-9">
              <p className="xl:text-lg text-gray-600 text-sm">
                No Account Yet?{" "}
                <span className="cursor-pointer hover:underline hover:text-rose">
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col xl:w-[50%] md:w-1/5 relative sm:hidden">
          <DesktopWaves />
        </section>
      </div>
    </div>
  );
}

function LoginForm({ setUsername, setPassword, loading, failed }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="flex flex-col gap-3">
      <TextField
        error={failed}
        onChange={(e) => setUsername(e.target.value)}
        label="Email"
        variant="outlined"
      />
      <TextField
        error={failed}
        onChange={(e) => setUsername(e.target.value)}
        label="Email"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        helperText={failed ? "Invalid username or password" : ""}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prevShowPassword) => !prevShowPassword)
                  }
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <button
        className="bg-blue-500 py-2 rounded-md text-white hover:bg-blue-700 transition-all"
        type="submit"
      >
        Submit form
      </button>
    </form>
  );
}

function MobileWaves() {
  return (
    <svg
      id="visual"
      viewBox="0 0 900 300"
      width="900"
      height="600"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      preserveAspectRatio="xMinYMax slice"
      className="w-full h-full absolute bottom-0 left-0 hidden sm:block"
    >
      <g className="path-group-mobile">
        <path
          d="M0 180L21.5 168C43 156 86 132 128.8 131C171.7 130 214.3 152 257.2 162.5C300 173 343 172 385.8 162C428.7 152 471.3 133 514.2 139C557 145 600 176 642.8 185.5C685.7 195 728.3 183 771.2 185.2C814 187.3 857 203.7 878.5 211.8L900 220L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
          fill="#68b4f2"
        ></path>
      </g>
      <g className="path-group-mobile">
        <path
          d="M0 283L21.5 272.7C43 262.3 86 241.7 128.8 228C171.7 214.3 214.3 207.7 257.2 202.3C300 197 343 193 385.8 198.5C428.7 204 471.3 219 514.2 225C557 231 600 228 642.8 244.5C685.7 261 728.3 297 771.2 295.5C814 294 857 255 878.5 235.5L900 216L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
          fill="#7bb9f5"
        ></path>
      </g>
      <g className="path-group-mobile">
        <path
          d="M0 384L21.5 378.3C43 372.7 86 361.3 128.8 351.2C171.7 341 214.3 332 257.2 339.3C300 346.7 343 370.3 385.8 383.5C428.7 396.7 471.3 399.3 514.2 398C557 396.7 600 391.3 642.8 374.8C685.7 358.3 728.3 330.7 771.2 319C814 307.3 857 311.7 878.5 313.8L900 316L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
          fill="#8bbef8"
        ></path>
      </g>
      <g className="path-group-mobile">
        <path
          d="M0 470L21.5 463C43 456 86 442 128.8 431.3C171.7 420.7 214.3 413.3 257.2 411.2C300 409 343 412 385.8 414.2C428.7 416.3 471.3 417.7 514.2 427.5C557 437.3 600 455.7 642.8 455.7C685.7 455.7 728.3 437.3 771.2 420.3C814 403.3 857 387.7 878.5 379.8L900 372L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
          fill="#9ac3fb"
        ></path>
      </g>
      <g className="path-group-mobile">
        <path
          d="M0 484L21.5 487.8C43 491.7 86 499.3 128.8 507.2C171.7 515 214.3 523 257.2 529.2C300 535.3 343 539.7 385.8 542.2C428.7 544.7 471.3 545.3 514.2 530.3C557 515.3 600 484.7 642.8 480.8C685.7 477 728.3 500 771.2 506.3C814 512.7 857 502.3 878.5 497.2L900 492L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
          fill="#a8c8fd"
        ></path>
      </g>
    </svg>
  );
}

function DesktopWaves() {
  return (
    <svg
      id="etBOQovIgNP1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      preserveAspectRatio="xMinYMax slice"
      className="w-full h-full absolute right-0"
    >
      {/* Wrap each path within a group and apply animation to the group */}
      <g className="path-group">
        <path
          d="M149,2000l24-41.7c24-41.6,72-125,80.5-208.3s-22.5-166.7-29-250s11.5-166.7,24.5-250s21-166.7,28.8-250c7.9-83.3,15.5-166.7-4.5-250s-67.6-166.7-86.8-250-9.8-166.7,16.2-250s68.6-166.7,90-208.3L314,0h586v41.7c0,41.6,0,125,0,208.3s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,208.3v41.7h-751Z"
          transform="translate(-149 0)"
          fill="#68b4f2"
        />
      </g>
      <g className="path-group">
        <path
          d="M356,2000l-1.7-41.7c-1.6-41.6-5-125,3.2-208.3s27.8-166.7,34.8-250s1.4-166.7-3.3-250-8.3-166.7.7-250s30.6-166.7,33-250c2.3-83.3-14.7-166.7-18.9-250-4.1-83.3,4.5-166.7-7.3-250s-44.2-166.7-60.3-208.3L320,0h580v41.7c0,41.6,0,125,0,208.3s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,208.3v41.7h-544Z"
          transform="translate(-139.711945 0)"
          fill="#77b8f4"
        />
      </g>
      <g className="path-group">
        <path
          d="M488,2000l-2.7-41.7c-2.6-41.6-8-125-10.1-208.3-2.2-83.3-1.2-166.7-8-250-6.9-83.3-21.5-166.7-23.5-250s8.6-166.7,15.3-250s9.3-166.7-3.2-250-40.1-166.7-63.1-250-41.4-166.7-20.9-250s79.9-166.7,109.5-208.3L511,0h389v41.7c0,41.6,0,125,0,208.3s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,208.3v41.7h-412Z"
          transform="translate(-139.711945 0)"
          fill="#85bcf7"
        />
      </g>
      <g className="path-group">
        <path
          d="M534,2000l-5.3-41.7c-5.4-41.6-16-125-31.2-208.3s-34.8-166.7-24.2-250c10.7-83.3,51.7-166.7,73.2-250s23.5-166.7,11.7-250c-11.9-83.3-37.5-166.7-49.5-250s-10.4-166.7,4.8-250s43.8-166.7,45-250-25.2-166.7-38.3-208.3L507,0h393v41.7c0,41.6,0,125,0,208.3s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,208.3v41.7h-366Z"
          transform="translate(-164.240376 12.442454)"
          fill="#91c0f9"
        />
      </g>
      <g className="path-group">
        <path
          d="M537,2000l-.7-41.7c-.6-41.6-2-125,1.5-208.3s11.9-166.7,12.4-250-6.9-166.7-5.9-250s10.4-166.7,27.4-250s41.6-166.7,43-250C616,666.7,594,583.3,588,500s4-166.7,1.5-250-17.5-166.7-25-208.3L557,0h343v41.7c0,41.6,0,125,0,208.3s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,208.3v41.7h-363Z"
          transform="translate(-85.544922 0)"
          fill="#9dc4fb"
        />
      </g>
      <g className="path-group">
        <path
          d="M647,2000l9.3-41.7c9.4-41.6,28-125,38.7-208.3s13.3-166.7,15.5-250s3.8-166.7-9-250-40.2-166.7-50.2-250-2.6-166.7,13.5-250C681,666.7,706,583.3,722.7,500c16.6-83.3,25-166.7,12.6-250C723,166.7,690,83.3,673.5,41.7L657,0h243v41.7c0,41.6,0,125,0,208.3s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,208.3v41.7h-253Z"
          transform="translate(-37.618946 0)"
          fill="#a8c8fd"
        />
      </g>
      <g className="path-group">
        <path
          d="M831,2000l-4.2-41.7c-4.1-41.6-12.5-125-22.6-208.3-10.2-83.3-22.2-166.7-26.2-250s0-166.7,9.5-250s24.5-166.7,26.8-250c2.4-83.3-8-166.7-14.1-250-6.2-83.3-8.2-166.7-2.5-250c5.6-83.3,19-166.7,18.5-250s-14.9-166.7-22-208.3L787,0h113v41.7c0,41.6,0,125,0,208.3s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,250s0,166.7,0,208.3v41.7h-69Z"
          fill="#b2ccff"
        />
      </g>
    </svg>
  );
}

export default Login;
