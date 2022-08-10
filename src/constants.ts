export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000'

export const url = `${baseUrl}/api/trpc`

export const draftMarkdown = `
While creating this blog using the t3 stack, I figured it could be useful to document the process of setting up, accessing and making changes to a postgres database running on a docker container. 


----------

If you're using the windows subsystem for linux, go to Docker Desktop settings , turn on WSL integration and choose the distro you have installed. I'm assuming the environment is all setup (docker is installed and using ubuntu with wsl)

# Step 1 

Run 

\`\`\`bash  
docker ps
\`\`\`



to make sure our image is up and running, if not just press the play button on Docker Desktop.

Now we need to create a user so we can connect to the db

\`\`\`bash  
docker run --name my-postgres -p 5432:5432 -e POSTGRES_PASSWORD=yourpassword -d postgres 
\`\`\`

This command will create a user for our postgres image (named "my-postgres" in this case) on ports 5432:5432 with a password of "yourpassword". This will be useful if you want to integrate this db with prisma or some other ORM.

# Step 2

Let's connect to our container logging in as root

\`\`\`bash 
docker exec -it 64ea9947646d5240557a7d0fb3dbc09737977662c49fd266c049d385c8f7f02d /bin/bash
\`\`\`

To enter postgres cli:


> psql -U postgres

# Step 3 

Step 3 is going to be a collection of simple postgres commands.

A single postgres server can handle multiple databases at the same time, it gets useful to know which databases we have available on the server throught the **\list** 
meta-command that can be abbreviated to:

\`\`\`bash
postgres=# \l
\`\`\`

After the db listing we can select one and connect to it with the **\connect \<yourdb\>** comand or in my case:

\`\`\`bash
postgres=# \c mydb
\`\`\`

Finally we can list all tables with 

\`\`\`bash
postgres=# \dt
\`\`\`

and describe each table using:

\`\`\`bash
postgres=# \d+ \"\<table_name\>\"
\`\`\`


# Notes

This post is going to serve as draft for future posts of this format, the goal is to keep these posts stored in a nice and useful way so future me can come here and consolidate all the things I learn and know
`

export const tailwindColors = [
    'bg-orange-500',
    'bg-green-500',
    'bg-slate-500',
    'bg-red-500',
    'bg-amber-100',
    'bg-lime-500',
    'bg-sky-500',
    'bg-violet-500',
    'bg-rose-400',
]