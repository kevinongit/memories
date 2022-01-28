import React, {useState} from 'react'
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {useNavigate, useLocation} from 'react-router-dom'

import TagsInput from './TagsInput'

import {getPostsBySearch} from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'

import useStyles from './styles'

import Pagination from '../Pagination'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({search, tags: tags.join(',')}))
      navigate(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`,
      )
    } else {
      navigate('/')
    }
  }

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      // enter key
      searchPost()
    }
  }

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <TagsInput
                selectedTags={items => {
                  console.log(items)
                }}
                fullWidth
                variant="outlined"
                id="tags"
                name="tags"
                placeholder="add Tags"
                // label="tags"
                selectedItem={tags}
                setSelectedItem={setTags}
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
