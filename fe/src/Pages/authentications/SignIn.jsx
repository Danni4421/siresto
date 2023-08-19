import { useState } from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { addAuth } from '../../api/auth';
import SirestoImage from '../../assets/img/siresto.png';
import Swal from 'sweetalert2';

export const SignIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAuth(username, password).then((res) => {
      if (res.status === 'success') {
        localStorage.setItem('ACCESS_TOKEN', res.data.accessToken);
        localStorage.setItem('AUTH_STATE', JSON.stringify(res.data.authState));
        let timerInterval;
        Swal.fire({
          title: 'Auto close alert!',
          html: 'I will close in <b></b> milliseconds.',
          timer: 500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer');
          }
        });
        window.location = '/';
      } else {
        alert('Login Gagal');
      }
    });
  };

  return (
    <div className="flex">
      <div className="image w-1/2 h-[100vh]">
        <img src={SirestoImage} alt="" className="h-[100vh] pl-5" />
      </div>
      <div className="form w-1/2 p-10 flex flex-col">
        <div className="py-16">
          <h1 className="logo text-5xl text-dark-green pb-4">Siresto</h1>
          <p className="motto">Hope you enjoy with Siresto</p>
        </div>
        <form className="w-2/3" onSubmit={handleSubmit}>
          <div className="username flex flex-col gap-2 pb-5">
            <label htmlFor="">Username</label>
            <TextField
              required
              id="outlined-required"
              label="Required"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="password flex flex-col gap-2 pb-5">
            <label htmlFor="">Password</label>
            <TextField
              required
              id="outlined-required"
              label="Required"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="confirm-password flex flex-col gap-2 pb-5">
            <label htmlFor="">Confirm Password</label>
            <TextField
              error={confirmPassword !== '' && confirmPassword !== password}
              required
              id={confirmPassword ? 'outlined-required' : 'outlined-error'}
              label="Required"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <Button
            variant="contained"
            color="warning"
            className="w-full h-14"
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
