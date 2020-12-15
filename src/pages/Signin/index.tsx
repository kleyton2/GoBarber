import React, { useCallback, useRef } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import { Form } from '@unform/web'
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import Input from '../../components/input';
import Button from '../../components/Button';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(async(data: object) => {
    try {
      formRef.current?.setErrors({});
      const shema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });
      await shema.validate(data, {
        abortEarly: false,
      })
    } catch (err) {
      console.log(err);
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber"/>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder= "E-mail"/>
          <Input name="password" icon={FiLock} type="password" placeholder= "Senha" />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;
