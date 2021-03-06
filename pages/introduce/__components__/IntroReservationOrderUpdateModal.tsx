import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import ModalView from '../../layout/__components__/ModalView'
import { reservationOrderUpdateModalActions } from '../../../store/modules/reservation-order-update.modal.slice'
import { getReservationOrderListResult, UpdateReservationOrderParams } from '../../../lib/types/types'

const updateReservationOrderDataSchema = yup
  .object({
    targetKimpRate: yup
      .number()
      .typeError('-5이상 10이하의 숫자를 입력해주세요.')
      .min(-5, '-5이상의 값을 입력해주세요.')
      .max(10, '10 이하의 값을 입력해주새요.')
      .required('목표 김프가 설정은 필수 값입니다.'),
    unCompletedQuantity: yup
      .number()
      .typeError('0.001이상 1이하의 숫자를 입력해주세요.')
      .min(0.001, '0.001이상의 값을 입력해주세요.')
      .max(1, '1 이하의 값을 입력해주새요.')
      .required('코인 주문 수량은 필수 값입니다.'),
    secretKey: yup.string().required('Secret Key는 필수 값입니다.'),
  })
  .required()

export default function IntroReservationOrderUpdateModal(props: getReservationOrderListResult) {
  const dispatch = useDispatch()
  const resolver = yupResolver(updateReservationOrderDataSchema)
  const { register, setValue, getValues, handleSubmit, formState, reset } = useForm<UpdateReservationOrderParams>({
    resolver,
  })
  const { errors } = formState

  useEffect(() => {
    setValue('targetKimpRate', props.targetKimpRate)
    setValue('unCompletedQuantity', props.unCompletedQuantity)
  }, [])

  const onClose = () => {
    dispatch(reservationOrderUpdateModalActions.updateModalHide())
  }

  const onSave = () => {
    if (!confirm(`정말 예약된 주문을 수정 하시겠습니까?`)) return
    alert('소개 페이지에서는 주문 수정이 불가능 합니다.')
  }

  const onDelete = () => {
    if (!confirm(`정말 예약된 주문을 취소 하시겠습니까?`)) return
    alert('소개 페이지에서는 주문 취소가 불가능 합니다.')
  }

  return (
    <ModalView width="350px" onSave={handleSubmit(onSave)} onClose={onClose} onDelete={onDelete} title="주문 수정하기">
      <form>
        <RowAlignFullScreenStyled>
          <Label>목표 김프가(%)</Label>
          <Input
            type="number"
            {...register('targetKimpRate')}
            placeholder="목표 김프가를 입력하세요. (ex 1.5 %)"
            step="0.1"
          />
          {errors.targetKimpRate && <ErrorMessageStyled>{errors.targetKimpRate?.message}</ErrorMessageStyled>}
          <Label>미체결량(BTC)</Label>
          <Input
            type="number"
            {...register('unCompletedQuantity')}
            placeholder="미체결량 수정하기. (ex 0.5 BTC)"
            step="0.1"
          />
          {errors.unCompletedQuantity && <ErrorMessageStyled>{errors.unCompletedQuantity?.message}</ErrorMessageStyled>}
          <Label>체결량(변경 불가)</Label>
          <ShowValueContainer>{props.completedQuantity}</ShowValueContainer>
          <Label>Secret Key</Label>
          <Input {...register('secretKey')} placeholder="Secret key를 입력해주세요" />
          {errors.secretKey && <ErrorMessageStyled>{errors.secretKey?.message}</ErrorMessageStyled>}
        </RowAlignFullScreenStyled>
      </form>
    </ModalView>
  )
}

export const RowAlignFullScreenStyled = styled.div`
  margin: 5px 0px 5px 0px;

  & * {
    width: 100%;
  }
`

const Input = styled.input`
  border: 1px solid #7282a6;
  width: 100%;
  height: 40px;
  line-height: 26px;
  background-color: inherit;
  color: #f9f9f9;
  margin-top: 5px;
  padding-left: 10px;
  font-size: 15px;
  input::placeholder {
    color: red;
    font-style: italic;
  }
`

const ShowValueContainer = styled.div`
  border: 1px solid #7282a6;
  width: 100%;
  height: 40px;
  line-height: 35px;
  background-color: inherit;
  color: #f9f9f9;
  margin-top: 5px;
  padding-left: 10px;
  font-size: 15px;
`

const Label = styled.p`
  color: #bbbecb;
  font-size: 14px;
  line-height: 27px;
  font-weight: bold;
  margin: 0;
  padding-top: 20px;
`

const ErrorMessageStyled = styled.span`
  display: block;
  color: red;
  font-size: 12px;
  left: 0;
`
