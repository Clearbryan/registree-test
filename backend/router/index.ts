import { Router, Request, Response } from 'express'
import { AppConstants } from '../constants/constants'
import axios, { AxiosResponse } from 'axios'
import { Student } from '../types/types'
import passport from 'passport'

const { UNIVERSITY_URI } = AppConstants

const router = Router()

class IndexRouter {
    // get raw data
    getRawData(): Router {
        return router.get('/', passport.authenticate('jwt', { session: false }), async(req: Request, res: Response) => {
            const queryLimit = parseInt(req.query.limit as string)
            const nextQuery = parseInt(req.query.next as string)
            const preResult: [Student] = [{student_id: '', mark: 0, university: '', name: ''}]
            const _result: [Student] = [{student_id: '', mark: 0, university: '', name: ''}]
            let marks: any = {}
            let names: any  = {}
            try {
                // get marks from api endpoint
                const uj_marks: AxiosResponse<any> = await axios.get(`${UNIVERSITY_URI}UJ/marks`)
                const uj_names: AxiosResponse<any> = await axios.get(`${UNIVERSITY_URI}UJ/names`)
                const su_marks: AxiosResponse<any> = await axios.get(`${UNIVERSITY_URI}SU/marks`)
                const su_names: AxiosResponse<any> = await axios.get(`${UNIVERSITY_URI}SU/names`)
                
                // create student objects based on the api response
                for(const [student_id, mark] of Object.entries(uj_marks.data)) {
                    marks = { student_id, mark, university: 'UJ' }
                    preResult.push(marks)
                }
                for(const [student_id, mark] of Object.entries(su_marks.data)) {
                    marks = { student_id, mark, university: 'SU' }
                    preResult.push(marks)
                }
                for(const [id ,name] of Object.entries(uj_names.data)) {
                    names = { id, name }
                    _result.push(names)
                }
                for(const [id ,name] of Object.entries(su_names.data)) {
                    names = { id, name }
                    _result.push(names)
                }
                // map result student names to results
                preResult.map((el: any) => {
                   return _result.forEach((res: any) => {
                        if(el.student_id == res.id) {
                            el.name = res.name
                        }
                    })
                })
                let result: any = []
                const paginate = (next: number) => {
                    result = preResult.slice(next, next + 5)
                }   
                paginate(nextQuery )
                
                // send response to client
                res.json({ success: true, result, prev: nextQuery, next: queryLimit + 5 })
            } catch (error) {
                console.log(error)
                res.json({success: false, error})
            }
        })
    }
}

export const indexRouter = new IndexRouter()

