import { Router, Request, Response } from 'express'
import { AppConstants } from '../constants/constants'
import axios, { AxiosResponse } from 'axios'
import { Student } from '../types/types'

const { UNIVERSITY_URI } = AppConstants

const router = Router()

class IndexRouter {
    // get raw data
    getRawData(): Router {
        return router.get('/', async(req: Request, res: Response) => {
            const result: [Student] = [{student_id: '', mark: 0, university: '', name: ''}]
            const _result: [Student] = [{student_id: '', mark: 0, university: '', name: ''}]
            
            try {
                // get marks from api endpoint
                const uj_marks: AxiosResponse<any> = await axios.get(`${UNIVERSITY_URI}UJ/marks`)
                const uj_names: AxiosResponse<any> = await axios.get(`${UNIVERSITY_URI}UJ/names`)
                const su_marks: AxiosResponse<any> = await axios.get(`${UNIVERSITY_URI}SU/marks`)
                const su_names: AxiosResponse<any> = await axios.get(`${UNIVERSITY_URI}SU/names`)

                let marks: any = {}
                let names: any  = {}
                
                // create student objects based on the api response
                for(const [student_id, mark] of Object.entries(uj_marks.data)) {
                    marks = { student_id, mark, university: 'UJ' }
                    result.push(marks)
                }
                for(const [student_id, mark] of Object.entries(su_marks.data)) {
                    marks = { student_id, mark, university: 'SU' }
                    result.push(marks)
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
                result.map((el: any) => {
                   return _result.forEach((res: any) => {
                        if(el.student_id == res.id) {
                            el.name = res.name
                        }
                    })
                })
                // send response to client
                res.json({ success: true, result })
            } catch (error) {
                console.log(error)
                res.json({success: false, error})
            }
        })
    }
}

export const indexRouter = new IndexRouter()

