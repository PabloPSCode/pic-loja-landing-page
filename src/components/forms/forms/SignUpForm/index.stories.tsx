// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import SignUpForm from ".";

const meta: Meta<typeof SignUpForm.Root> = {
    title: "Forms/SignUpForm",
    component: SignUpForm.Root,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
   docs: {
  description: {
    component:
      `Formulário de **Cadastro** (padrão **compound**). Use \`SignUpForm.Root\` e componha com:\n\n` +
      `- \`SignUpForm.Title\` – título principal e subtítulo opcional.\n` +
      `- \`SignUpForm.TextInput\` – campo de texto controlado com \`label\`, \`helperText\`, \`errorMessage\` e acessibilidade.\n` +
      `- \`SignUpForm.PasswordInput\` – campo de senha controlado, com botão de mostrar/ocultar.\n` +
      `- \`SignUpForm.Requirements\` – lista dinâmica de requisitos de senha, validada conforme o usuário digita.\n` +
      `- \`SignUpForm.Submit\` – botão principal para envio (internamente usa \`SignUpButton\`).\n\n` +

      `### Props – \`SignUpForm.Root\`\n` +
      `- **bordered?**: \`boolean\` – adiciona borda ao redor do formulário (padrão: \`true\`).\n` +
      `- **onSubmit?**: \`(e: React.FormEvent<HTMLFormElement>) => void\` – handler de envio (o componente já previne reload).\n` +
      `- **className?**: \`string\` – classes extras para o contêiner do form.\n\n` +

      `### Props – Subcomponentes (resumo)\n` +
      `**Title**\n` +
      `- **title** *(string, obrigatório)* – título do formulário.\n` +
      `- **subtitle?** *(string)* – subtítulo abaixo do título.\n` +
      `- **className?, subtitleClassName?** *(string)* – classes extras.\n\n` +

      `**TextInput**\n` +
      `- **label** *(string, obrigatório)* – rótulo acessível.\n` +
      `- **helperText?** *(string)* – texto auxiliar.\n` +
      `- **errorMessage?** *(string)* – mensagem de erro (prioridade sobre helper).\n` +
      `- **containerClassName?** *(string)* – classes do wrapper externo.\n` +
      `- **...InputHTMLAttributes** – quaisquer props nativas de \`<input>\`.\n\n` +

      `**PasswordInput** (mesmas props do \`TextInput\` +)\n` +
      `- **showPasswordVisibility?** *(boolean)* – mostra botão de alternar visibilidade (padrão: \`true\`).\n` +
      `- **autoComplete?** *(string)* – padrão: \`new-password\`.\n\n` +

      `**Requirements**\n` +
      `- **requirements** *(objeto)* – define quais critérios validar (ex.: { hasUpperCase, hasNumber, minLength: 8 }).\n` +
      `- **password** *(string, obrigatório)* – senha a validar.\n` +
      `- **passwordValidatedRef** *(Ref<boolean>, obrigatório)* – ref externo atualizado automaticamente para indicar validade.\n` +
      `- **heading?** *(string)* – texto acima da lista (padrão: “Sua senha deve conter:”).\n\n` +

      `**Submit**\n` +
      `- **buttonLabel?** *(string)* – texto do botão (padrão: “Criar minha conta”).\n` +
      `- **disabled?** *(boolean)* – desabilita o botão.\n` +
      `- **isLoading?** *(boolean)* – mostra estado de carregamento.\n` +
      `- **className?** *(string)* – classes extras.\n`,
  },
  subcomponents: {
    Title: SignUpForm.Title,
    TextInput: SignUpForm.TextInput,
    PasswordInput: SignUpForm.PasswordInput,
    Requirements: SignUpForm.Requirements,
    Submit: SignUpForm.Submit,
  },
}
    },
    argTypes: {
        onSubmit: { action: "submitted", description: "Evento disparado ao enviar o formulário." },
        className: { control: false, description: "Classe opcional para o contêiner `<form>`." },
        children: { control: false, description: "Elementos `SignUpForm.*` filhos."},
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Exemplo padrão com regras comuns (mínimo 8, maiúscula, minúscula, número e especial) */
export const Default: Story = {
    render: (args) => {
        // Estados controlados pelo story (screen)
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [pwd, setPwd] = useState("");
        const [pwdConfirm, setPwdConfirm] = useState("");

        // Ref que `Requirements` preenche com true/false quando a senha atende as regras
        const pwdValidRef = useRef<boolean>(false);

        // Regras padrão
        const requirements = {
            minLength: 8,
            hasLowerCase: true,
            hasUpperCase: true,
            hasNumber: true,
            hasSpecial: true,
        } as const;

        const canSubmit =
            !!name &&
            !!email &&
            !!pwd &&
            !!pwdConfirm &&
            pwd === pwdConfirm &&
            pwdValidRef.current;

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // Dispara o evento do Storybook e mostra dados de exemplo
            (args).onSubmit?.(e);
            if (canSubmit) {
                alert(
                    JSON.stringify(
                        { name, email, password: pwd, passwordConfirmation: pwdConfirm },
                        null,
                        2
                    )
                );
            }
        };

        return (
            <SignUpForm.Root {...args} onSubmit={handleSubmit}>
                <SignUpForm.Title
                    title="Criar conta"
                    subtitle="Preencha seus dados para concluir o cadastro."
                />

                
                    <SignUpForm.TextInput
                        label="Nome"
                        placeholder="Seu nome"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <SignUpForm.TextInput
                        label="E-mail"
                        type="email"
                        placeholder="voce@empresa.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                <SignUpForm.Requirements
                    heading="Sua senha deve conter:"
                    requirements={requirements}
                    password={pwd}
                    passwordValidatedRef={pwdValidRef}
                    className="mt-2 mb-2"
                />

                    <SignUpForm.PasswordInput
                        label="Senha"
                        autoComplete="new-password"
                        placeholder="Mínimo de 8 caracteres"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                    <SignUpForm.PasswordInput
                        label="Confirmação da senha"
                        autoComplete="new-password"
                        placeholder="Confirme a senha"
                        value={pwdConfirm}
                        onChange={(e) => setPwdConfirm(e.target.value)}
                        errorMessage={
                            pwd && pwdConfirm && pwd !== pwdConfirm
                                ? "As senhas não correspondem"
                                : undefined
                        }
                    />

                <SignUpForm.Submit
                    buttonLabel="Criar minha conta"
                    disabled={!canSubmit}
                    className="mt-4"
                />
            </SignUpForm.Root>
        );
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Fluxo típico de cadastro com **regras completas**: mínimo de 8 caracteres, letras maiúsculas e minúsculas, número e caractere especial. " +
                    "O botão só habilita quando todas as regras são atendidas **e** as senhas coincidem.",
            },
        },
    },
};

/** Variações de validação de senha (dois formulários lado a lado com regras diferentes) */
export const WithDifferentPasswordValidations: Story = {
    render: (args) => {
        // --- Form "Regras Fortes"
        const [nameA, setNameA] = useState("");
        const [emailA, setEmailA] = useState("");
        const [pwdA, setPwdA] = useState("");
        const [pwdConfirmA, setPwdConfirmA] = useState("");
        const pwdValidRefA = useRef<boolean>(false);

        const strongRules = {
            minLength: 10,
            hasLowerCase: true,
            hasUpperCase: true,
            hasNumber: true,
            hasSpecial: true,
        } as const;

        const canSubmitA =
            !!nameA &&
            !!emailA &&
            !!pwdA &&
            !!pwdConfirmA &&
            pwdA === pwdConfirmA &&
            pwdValidRefA.current;

        // --- Form "Regras Leves"
        const [nameB, setNameB] = useState("");
        const [emailB, setEmailB] = useState("");
        const [pwdB, setPwdB] = useState("");
        const [pwdConfirmB, setPwdConfirmB] = useState("");
        const pwdValidRefB = useRef<boolean>(false);

        const lightRules = {
            minLength: 6,
            hasNumber: true,
            // demais regras ficam **opcionais**
        } as const;

        const canSubmitB =
            !!nameB &&
            !!emailB &&
            !!pwdB &&
            !!pwdConfirmB &&
            pwdB === pwdConfirmB &&
            pwdValidRefB.current;

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bloco A - Fortes */}
                <SignUpForm.Root
                    {...args}
                    onSubmit={(e) => {
                        e.preventDefault();
                        (args).onSubmit?.(e);
                        if (canSubmitA) {
                            alert(
                                "[Fortes] " +
                                JSON.stringify(
                                    {
                                        name: nameA,
                                        email: emailA,
                                        password: pwdA,
                                        passwordConfirmation: pwdConfirmA,
                                    },
                                    null,
                                    2
                                )
                            );
                        }
                    }}
                >
                    <SignUpForm.Title
                        title="Criar conta — Regras Fortes"
                        subtitle="Mín. 10 caracteres, com maiúscula, minúscula, número e especial."
                    />

                    
                        <SignUpForm.TextInput
                            label="Nome"
                            placeholder="Seu nome"
                            value={nameA}
                            onChange={(e) => setNameA(e.target.value)}
                        />
                        <SignUpForm.TextInput
                            label="E-mail"
                            type="email"
                            placeholder="voce@empresa.com"
                            value={emailA}
                            onChange={(e) => setEmailA(e.target.value)}
                        />

                    <SignUpForm.Requirements
                        heading="Sua senha deve conter:"
                        requirements={strongRules}
                        password={pwdA}
                        passwordValidatedRef={pwdValidRefA}
                        className="mt-2 mb-2"
                    />

                        <SignUpForm.PasswordInput
                            label="Senha"
                            placeholder="Mínimo de 10 caracteres"
                            value={pwdA}
                            onChange={(e) => setPwdA(e.target.value)}
                        />
                        <SignUpForm.PasswordInput
                            label="Confirmação da senha"
                            placeholder="Confirme a senha"
                            value={pwdConfirmA}
                            onChange={(e) => setPwdConfirmA(e.target.value)}
                            errorMessage={
                                pwdA && pwdConfirmA && pwdA !== pwdConfirmA
                                    ? "As senhas não correspondem"
                                    : undefined
                            }
                        />

                    <SignUpForm.Submit
                        buttonLabel="Criar minha conta"
                        disabled={!canSubmitA}
                        className="mt-4"
                    />
                </SignUpForm.Root>

                {/* Bloco B - Leves */}
                <SignUpForm.Root
                    {...args}
                    onSubmit={(e) => {
                        e.preventDefault();
                        (args).onSubmit?.(e);
                        if (canSubmitB) {
                            alert(
                                "[Leves] " +
                                JSON.stringify(
                                    {
                                        name: nameB,
                                        email: emailB,
                                        password: pwdB,
                                        passwordConfirmation: pwdConfirmB,
                                    },
                                    null,
                                    2
                                )
                            );
                        }
                    }}
                >
                    <SignUpForm.Title
                        title="Criar conta — Regras Leves"
                        subtitle="Mín. 6 caracteres e pelo menos 1 número."
                    />

                    
                        <SignUpForm.TextInput
                            label="Nome"
                            placeholder="Seu nome"
                            value={nameB}
                            onChange={(e) => setNameB(e.target.value)}
                        />
                        <SignUpForm.TextInput
                            label="E-mail"
                            type="email"
                            placeholder="voce@empresa.com"
                            value={emailB}
                            onChange={(e) => setEmailB(e.target.value)}
                        />

                    <SignUpForm.Requirements
                        heading="Sua senha deve conter:"
                        requirements={lightRules}
                        password={pwdB}
                        passwordValidatedRef={pwdValidRefB}
                        className="mt-2 mb-2"
                    />

                        <SignUpForm.PasswordInput
                            label="Senha"
                            placeholder="Mínimo de 6 caracteres"
                            value={pwdB}
                            onChange={(e) => setPwdB(e.target.value)}
                        />
                        <SignUpForm.PasswordInput
                            label="Confirmação da senha"
                            placeholder="Confirme a senha"
                            value={pwdConfirmB}
                            onChange={(e) => setPwdConfirmB(e.target.value)}
                            errorMessage={
                                pwdB && pwdConfirmB && pwdB !== pwdConfirmB
                                    ? "As senhas não correspondem"
                                    : undefined
                            }
                        />

                    <SignUpForm.Submit
                        buttonLabel="Criar minha conta"
                        disabled={!canSubmitB}
                        className="mt-4"
                    />
                </SignUpForm.Root>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Fluxo típico de cadastro com **regras completas**: mínimo de 8 caracteres, letras maiúsculas e minúsculas, número e caractere especial. " +
                    "O botão só habilita quando todas as regras são atendidas **e** as senhas coincidem.",
            },
        },
    }
}
