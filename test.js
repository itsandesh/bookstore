sendEmail({
    from: "noreply@test.com",
    to: payload.email,
    subject: "Account Registered!",
    textMessage: "Dear user your accound has been registered",
    htmlMessage: `<p><strong>Congratulations your account has been registered</strong></p>`,
})

res.json({
    result: result,
    status: true,
    msg: "Your account has been registered",
    neta: null
})



