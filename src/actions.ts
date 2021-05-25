import { Request, Response } from 'express'
import { getRepository, getManager } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Family } from './entities/Family'
import { Exception } from './utils'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(Users)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(Users).create(req.body);  //Creo un usuario
    const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find();
    return res.json(users);
}

export const findTrees = async (req: Request, res: Response): Promise<Response> => {
    const manager = getManager();
    const trees = await manager.getTreeRepository(Family).findTrees();
    return res.json(trees);
}

export const createTree = async (req: Request, res: Response): Promise<Response> => {

    const manager = getManager();

    const a1 = new Family();
    a1.name = "GrandParent";
    await manager.save(a1);

    const a11 = new Family();
    a11.name = "Parent1";
    a11.parent = a1;
    await manager.save(a11);

    const a12 = new Family();
    a12.name = "Parent2";
    a12.parent = a1;
    await manager.save(a12);

    const a111 = new Family();
    a111.name = "Current1";
    a111.parent = a11;
    await manager.save(a111);

    const a112 = new Family();
    a112.name = "Current2";
    a112.parent = a11;
    await manager.save(a112);

    const trees = await manager.getTreeRepository(Family).findTrees();
    return res.json(trees);
}

export const getMemberId = async (req: Request, res: Response): Promise<Response> => {

    const manager = getManager();

    const member = await manager.findOne(Family, req.params.id);
    if (!member) throw new Exception("Member does not exist")
    
    return res.json(member);
}