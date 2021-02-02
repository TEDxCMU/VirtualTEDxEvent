import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIE } from '@lib/constants';
import cookie from 'cookie';
import ms from 'ms';
import { getCurrentUser, signInUser } from '@lib/firestore-api';

type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export default async function signIn( req: NextApiRequest, res: NextApiResponse) 
{
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  const email: string = ((req.body.email as string) || '');
  const password: string = ((req.body.password as string) || '');
  let user;
  let id;

    try{
        // id = await getEmailInfo(email);
        // if (!id){
        //     return res.status(400).json({
        //         error: {
        //             code: 'email_err',
        //             message: "Email is not in emails collection"
        //         }
        //     });
        // }
        // console.log("Got id from emails collection")
        // console.log(id);
        await signInUser(email, password);
        user = await getCurrentUser();
        if (!user){
          throw new Error();
        }
    } catch (e) {
        console.log("Error from sign-in api")
        console.log(e);
        if (e.code?.slice(0, 5) === "auth/"){
            return res.status(400).json({
                error: {
                code: 'auth_err',
                message: e.message
                }
            });
        }

        return res.status(400).json({
            error: {
                code: 'other_err',
                message: e.message
            }
        });
        
    }

  id = user.uid;
  
  // Save `key` in a httpOnly cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(COOKIE, id, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/api',
      expires: new Date(Date.now() + ms('1 day'))
    })
  );

  console.log("Saved cookie")

  return res.status(200).json({ signInSuccess: true });
}