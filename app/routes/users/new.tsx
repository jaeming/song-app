import { Prisma } from "@prisma/client";
import { ActionFunction, redirect, useActionData, Form, useTransition } from "remix"
import { db } from "~/lib/db.server"

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData() as any
  const values = Object.fromEntries(formData)
  if (formData.get('password') !== formData.get('confirmPassword')) {
    return { errors: { confirmPassword: 'Password and confirmation password do not match!' }, values }
  }
  try {
    const user = await db.user.create({ data: { email: formData.get('email'), password: formData.get('password') } })
    return redirect(`/users/${user.id}`)
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') return { errors: { email: 'A user with this email address already exists' }, values }
    }
    return e
  }
}

export default function newUser() {
  const transition = useTransition()
  const actionData = useActionData()
  return (
    <Form method="post" action="/users/new">
      <fieldset disabled={transition.state === "submitting"}>
        <label>Email: </label>
        <br />
        <input name="email" type="email" required defaultValue={actionData?.values.email} />
        <br />
        {actionData?.errors.email ? (
          <p style={{ color: "red" }}>{actionData.errors.email}</p>
        ) : null}
        <label>Password: </label>
        <br />
        <input name="password" type="password" required defaultValue={actionData?.values.password} />
        <br />
        <label>Confirm Password: </label>
        <br />
        <input name="confirmPassword" type="password" required defaultValue={actionData?.values.confirmPassword} />
        <br />
        {actionData?.errors.confirmPassword ? (
          <p style={{ color: "red" }}>{actionData.errors.confirmPassword}</p>
        ) : null}
        <button type='submit'>
          {transition.state === "submitting"
            ? "Saving..."
            : "Register"}
        </button>
      </fieldset>
    </Form>
  )
}

