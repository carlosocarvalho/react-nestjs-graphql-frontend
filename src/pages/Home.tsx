import React from 'react'
import gql from 'graphql-tag'
import Header from '../components/Header'
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import { Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



const GET_AUTHORS = gql`
    query getAuthors {
        authors {
        id
        name
        }
    }
`

const DELETE_AUTHOR = gql`
    mutation deleteAuthor( $id: Float!) {
        deleteAuthor( data: {
           id: $id
        }) {
        id
        }
    }
`

const SUB_CREATED_AUTHOR = gql`
    subscription onAuthorCreated{
        authorCreated {
        id
        name
        }
    }
`

interface HomeProps extends RouteComponentProps { }



const Home: React.FC<HomeProps> = () => {
    const { data, refetch } = useQuery(GET_AUTHORS)
    const sub = useSubscription(SUB_CREATED_AUTHOR)
    const hasCreated = sub.data
    React.useEffect(() => {
        if (hasCreated !== undefined)
            setTimeout(() => {
                refetch()
            }, 100)

    }, [hasCreated, refetch])
    const classes = useStyles();

    return (
        <React.Fragment>
            <Header title="Autores" />
            <Container>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">#</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!!data && <AuthorList data={data.authors} />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>

    )
}




function AuthorList(props: any) {
    const { data } = props

    const [handleDelete] = useMutation(DELETE_AUTHOR, {
        refetchQueries: ['getAuthors']
    });

    function onDelete(id: any) {
        handleDelete({ variables: { id } })

    }
    return (
        <React.Fragment>
            {!!data && data.map((row: any) => (
                <TableRow key={row.id}>
                    <TableCell>
                        {row.id}
                    </TableCell>
                    <TableCell >{row.name}</TableCell>
                    <TableCell align="right">
                        <IconButton onClick={() => {
                            onDelete(row.id)
                        }} aria-label="delete" >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </TableCell>

                </TableRow>
            ))}
        </React.Fragment>)
}

export default Home